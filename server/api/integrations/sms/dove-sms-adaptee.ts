import {SmsVendor} from './sms-adapter';

export default class DoveSmsVendor extends SmsVendor {
    senderId = 'AXOMRC';
    url: string = 'http://mobicomm.dove-sms.com/submitsms.jsp?' +
        'user=DPENINT&' +
        'key=2bdb4f1bedXX&' +
        'mobile={{phone}}&' +
        'message={{message}}&' +
        'senderid={{senderId}}&' +
        'accusage=1';
}
