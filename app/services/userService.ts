import { errorResponse, successResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { userRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utility/error";
import { userType } from "../models/UserModel";
import {
    generateToken,
    getHashedPassowrd,
    getSalt,
    validatePassword,
    verifyToken,
} from "../utility/password";
import { LoginInput } from "../models/dto/loginInput";
import {
    generateAccessCode,
    sendVerificationCode,
} from "../utility/notification";
@autoInjectable()
export class userService {
    repository: userRepository;
    constructor(repository: userRepository) {
        this.repository = repository;
    }
    async signUp(params: APIGatewayProxyEventV2) {
        try {
            const input = plainToClass(SignupInput, params.body);
            console.log("input", input);
            const error = await AppValidationError(input);
            if (error) return errorResponse(400, error);
            const salt = await getSalt();
            const password = await getHashedPassowrd(input.password, salt);
            const data = await this.repository.createAccount({
                phone: input.phone,
                email: input.email,
                password,
                salt,
                userType: userType.BUYER,
            });
            return successResponse({ data });
        } catch (err) {
            return errorResponse(500, err);
        }
    }

    async login(params: APIGatewayProxyEventV2) {
        try {
            const input = plainToClass(LoginInput, params.body);
            console.log("input", input);
            const error = await AppValidationError(input);
            if (error) return errorResponse(400, error);
            // const salt = await getSalt();
            // const password = await getHashedPassowrd(input.password, salt);
            const data = await this.repository.findAccount({
                email: input.email,
            });
            const verifyPassword = await validatePassword(
                input.password,
                data.password,
                data.salt,
            );
            if (!verifyPassword) return errorResponse(400, "Invalid password");
            const token = generateToken(data);
            return successResponse({ token });
        } catch (err) {
            return errorResponse(500, err);
        }
    }

    async getVerificationToken(params: APIGatewayProxyEventV2) {
        try {
            const token = params.headers?.authorization;
            const payload = await verifyToken(token);
            if (payload) {
                const { code, expiry } = generateAccessCode();
                sendVerificationCode({
                    code,
                    phone: payload.phone,
                });
                return successResponse({
                    message: `Verification code sent successfully to registered number ${payload.phone}`,
                });
            }
        } catch (err) {
            console.log("error in getveirifcaiton tokewn", err);
            return errorResponse(500, err);
        }
    }

    async verifyUser(params: APIGatewayProxyEventV2) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify({
                message: "User verified successfully!",
            }),
        };
    }

    async getUserProfile(params: APIGatewayProxyEventV2) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify({
                message: "Profile fetched successfully!",
                data: { name: "Vaibhav", email: "vaibhav@gmail.com" },
            }),
        };
    }

    async createUserProfile(params: APIGatewayProxyEventV2) {
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify({
                message: "Profile created successfully!",
            }),
        };
    }

    async editUserProfile(params: APIGatewayProxyEventV2) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
            body: JSON.stringify({
                message: "Profile updated successfully!",
                data: {
                    name: "Current Name",
                    email: "current.email@example.com",
                },
            }),
        };
    }
}
