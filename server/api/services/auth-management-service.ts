'use strict';

import UserRepository from '../database/repository/user.repository';
import {User} from '../../../common/model/User';
import jwt from 'jsonwebtoken';
import {AppConfig} from '../config/app-config';
import crypto from 'crypto';
import SmsAdapter from '../integrations/sms/sms-adapter';
import DoveSmsVendor from '../integrations/sms/dove-sms-adaptee';
import AppError from '../utils/errors/AppError';
import {totp as tOtp} from 'notp';
import logger from '../utils/logger.service';
import isEmpty from 'lodash/isEmpty';

class AuthManagementService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async loginUser(organisationId: number, userDTO: any): Promise<string | any> {
        logger.info({
            organisationId,
            userDTO,
        });
        const {userName} = userDTO;
        const user: User | null = await this.userRepository.findOneByUsername(organisationId, userName);
        logger.info({
            user
        });
        if (!user) {
            throw new AppError('Incorrect Login / Password');
        }
        const passwordMatched = await this._matchPassword(user.password, userDTO.password, user);
        if (passwordMatched) {
            const otpSent = new SmsAdapter(new DoveSmsVendor()).sendOtp(user);
            if (!otpSent) {
                throw new AppError('Error While Sending OTP');
            }
            return {
                success: true,
                otpSentOn: `XXXXXXX${user.phone.slice(7)}`,
                userName: user.userName
            };
        } else {
            throw new AppError('Invalid Login/ Password');
        }
    }

    async verifyOtp(organisationId: number, userDTO: any, otp: string) {
        logger.info({
            function: 'verifyOtp',
            organisationId,
            userDTO,
            otp
        });
        const {userName} = userDTO;
        const user: User | null = await this.userRepository.findOneWithAllRelatedModels({userName, organisationId});
        logger.info({
            user
        });
        if (!user || isEmpty(user)) {
            throw new AppError('User Doesnt Have Any Access');
        }
        /**
         * null : Invalid Otp,
         * else {delta: #}
         */
        const valid = tOtp.verify(otp, user.salt, {
            time: 120, // step,
            window: 2
        });
        if (!valid) {
            throw new AppError('Invalid OTP Entered');
        }
        const token = jwt.sign({
            userId: user.userId,
            userName: user.userName,
            time: Date.now()
        }, AppConfig.JWT_SECRET, {algorithm: 'HS256'});
        return {
            token,
            user: {...user, password: undefined, salt: undefined}
        };
    }

    async decodeToken(token: string): Promise<any> {
        const decoded = await new Promise<any>((resolve, reject) => {
            jwt.verify(token, AppConfig.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    return reject(err);
                }
                resolve(decodedToken);
            });
        });
        console.log(decoded);
        if (decoded.userId) {
            return this.userRepository.findOneWithRoles({userId: decoded.userId});
        } else {
            return null;
        }
    }

    private async _matchPassword(password: string | undefined, checkPassword: string, user: User): Promise<boolean> {
        const hash = crypto.pbkdf2Sync(checkPassword,
            // @ts-ignore
            user.salt, 1000, 64, `sha512`).toString(`hex`);
        return password === hash;
    }


}

/*
 */
// AdminSchema.methods.setPassword = function (password) {
//
//     // Creating a unique salt for a particular user
//     this.salt = crypto.randomBytes(16).toString('hex');
//
//     // Hashing user's salt and password with 1000 iterations,
//     this.password = crypto.pbkdf2Sync(password, this.salt,
//         1000, 64, `sha512`).toString(`hex`);
// };

// AdminSchema.methods.validPassword = function (password) {
//     const hash = crypto.pbkdf2Sync(password,
//         this.salt, 1000, 64, `sha512`).toString(`hex`);
//     return this.password === hash;
// };
/*
const password: string = await new Promise((resolve, reject) => {
        crypto.pbkdf2(process.env.ADMIN_PASSWORD, salt,
            1000, 64, `sha512`, (err, key) => {
                if (err) {
                    return reject(err);
                }
                resolve(key.toString(`hex`));
            });
    });
 */

export default AuthManagementService;
