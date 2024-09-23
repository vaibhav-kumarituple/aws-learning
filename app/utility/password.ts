import { userModel } from "app/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const appSecret = "dev";
export const getSalt = async () => {
    return await bcrypt.genSalt(10);
};
export const getHashedPassowrd = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};
export const validatePassword = async (
    password: string,
    hashedPassword: string,
    salt: string,
) => {
    return (await getHashedPassowrd(password, salt)) === hashedPassword;
};

export const generateToken = ({
    email,
    user_id,
    phone,
    userType,
}: userModel) => {
    return jwt.sign({ user_id, email, phone, userType }, appSecret, {
        expiresIn: "30d",
    });
};

export async function verifyToken(token: string): Promise<userModel | false> {
    try {
        if (token !== "") {
            const payload = jwt.verify(token.split(" ")[1], appSecret);
            return payload as userModel;
        }
        return false;
    } catch (err) {
        return false;
    }
}
