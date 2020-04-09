import {User} from '../../../../common/model/User';
import {totp as tOtp} from 'notp';
import axios from 'axios';
import LoggerService from '../../utils/logger.service';
import Handlebars from 'handlebars';

/**
 * To add a new ThirdParty SMS Verdor extend this class
 */
export abstract class SmsVendor {
    abstract senderId: string;
    abstract url: string;

    async sendMessage(phone: string, text: string) {
        const url = Handlebars.compile(this.url)({
            phone,
            message: text,
            senderId: this.senderId
        });
        let response;
        try {
            if (process.env.SEND_SMS === 'true') {
                response = await axios.get(url);
            }
            LoggerService.info({
                file: 'SmsVendor',
                message: process.env.SEND_SMS === 'true' ? 'Sent Message' : 'SMS Sending Disabled',
                url,
                text,
                response,
            });
            return true;
        } catch (e) {
            LoggerService.error({
                file: 'SmsVendor',
                message: 'Error Sending Message',
                templateUrl: this.url,
                url,
                text,
                e
            });
            return false;
        }
    }
}

export default class SmsAdapter {
    otpMessageTemplate = 'Your OTP for login Is {{otp}}';

    constructor(private vendor: SmsVendor) {
    }

    async sendOtp(user: User) {
        const otp = tOtp.gen(user.salt, {
            time: 120 // step
        });
        const message = Handlebars.compile(this.otpMessageTemplate)({
            otp
        });
        return await this.vendor.sendMessage(user.phone, message);
    }


}
