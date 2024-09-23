"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const response_1 = require("../utility/response");
const userRepository_1 = require("../repository/userRepository");
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const SignupInput_1 = require("../models/dto/SignupInput");
const error_1 = require("../utility/error");
const UserModel_1 = require("../models/UserModel");
const password_1 = require("../utility/password");
const loginInput_1 = require("../models/dto/loginInput");
const notification_1 = require("../utility/notification");
let userService = class userService {
    constructor(repository) {
        this.repository = repository;
    }
    signUp(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToClass)(SignupInput_1.SignupInput, params.body);
                console.log("input", input);
                const error = yield (0, error_1.AppValidationError)(input);
                if (error)
                    return (0, response_1.errorResponse)(400, error);
                const salt = yield (0, password_1.getSalt)();
                const password = yield (0, password_1.getHashedPassowrd)(input.password, salt);
                const data = yield this.repository.createAccount({
                    phone: input.phone,
                    email: input.email,
                    password,
                    salt,
                    userType: UserModel_1.userType.BUYER,
                });
                return (0, response_1.successResponse)({ data });
            }
            catch (err) {
                return (0, response_1.errorResponse)(500, err);
            }
        });
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToClass)(loginInput_1.LoginInput, params.body);
                console.log("input", input);
                const error = yield (0, error_1.AppValidationError)(input);
                if (error)
                    return (0, response_1.errorResponse)(400, error);
                // const salt = await getSalt();
                // const password = await getHashedPassowrd(input.password, salt);
                const data = yield this.repository.findAccount({
                    email: input.email,
                });
                const verifyPassword = yield (0, password_1.validatePassword)(input.password, data.password, data.salt);
                if (!verifyPassword)
                    return (0, response_1.errorResponse)(400, "Invalid password");
                const token = (0, password_1.generateToken)(data);
                return (0, response_1.successResponse)({ token });
            }
            catch (err) {
                return (0, response_1.errorResponse)(500, err);
            }
        });
    }
    getVerificationToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = params.headers) === null || _a === void 0 ? void 0 : _a.authorization;
                const payload = yield (0, password_1.verifyToken)(token);
                if (payload) {
                    const { code, expiry } = (0, notification_1.generateAccessCode)();
                    (0, notification_1.sendVerificationCode)({
                        code,
                        phone: payload.phone,
                    });
                    return (0, response_1.successResponse)({
                        message: `Verification code sent successfully to registered number ${payload.phone}`,
                    });
                }
            }
            catch (err) {
                console.log("error in getveirifcaiton tokewn", err);
                return (0, response_1.errorResponse)(500, err);
            }
        });
    }
    verifyUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getUserProfile(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    createUserProfile(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    editUserProfile(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
};
exports.userService = userService;
exports.userService = userService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [userRepository_1.userRepository])
], userService);
//# sourceMappingURL=userService.js.map