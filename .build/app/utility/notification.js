"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessCode = generateAccessCode;
exports.sendVerificationCode = sendVerificationCode;
const twilio_1 = __importDefault(require("twilio"));
const accountSiD = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const authPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = (0, twilio_1.default)(accountSiD, authToken);
function generateAccessCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(expiry.getTime() + 30 * 60 * 1000);
    return { code, expiry };
}
function sendVerificationCode(_a) {
    return __awaiter(this, arguments, void 0, function* ({ code, phone, }) {
        return yield twilioClient.messages.create({
            body: `Your verification code is: ${code}`,
            to: `+91${phone}`,
            from: authPhoneNumber,
        });
    });
}
//# sourceMappingURL=notification.js.map