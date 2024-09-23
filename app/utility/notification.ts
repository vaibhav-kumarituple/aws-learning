import twilio from "twilio";
const accountSiD = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const authPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSiD, authToken);

export function generateAccessCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(expiry.getTime() + 30 * 60 * 1000);
    return { code, expiry };
}

export async function sendVerificationCode({
    code,
    phone,
}: {
    code: number;
    phone: string;
}) {
    return await twilioClient.messages.create({
        body: `Your verification code is: ${code}`,
        to: `+91${phone}`,
        from: authPhoneNumber,
    });
}
