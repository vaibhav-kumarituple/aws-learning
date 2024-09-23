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
exports.generateToken = exports.validatePassword = exports.getHashedPassowrd = exports.getSalt = void 0;
exports.verifyToken = verifyToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appSecret = "dev";
const getSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt(10);
});
exports.getSalt = getSalt;
const getHashedPassowrd = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.getHashedPassowrd = getHashedPassowrd;
const validatePassword = (password, hashedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.getHashedPassowrd)(password, salt)) === hashedPassword;
});
exports.validatePassword = validatePassword;
const generateToken = ({ email, user_id, phone, userType, }) => {
    return jsonwebtoken_1.default.sign({ user_id, email, phone, userType }, appSecret, {
        expiresIn: "30d",
    });
};
exports.generateToken = generateToken;
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (token !== "") {
                const payload = jsonwebtoken_1.default.verify(token.split(" ")[1], appSecret);
                return payload;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    });
}
//# sourceMappingURL=password.js.map