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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const databaseClient_1 = require("../utility/databaseClient");
class userRepository {
    createAccount(_a) {
        return __awaiter(this, arguments, void 0, function* ({ phone, email, password, salt, userType }) {
            const client = yield (0, databaseClient_1.databaseClient)();
            yield client.connect();
            const querystring = `INSERT INTO users(phone, email, password, salt, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *`;
            const values = [phone, email, password, salt, userType];
            const result = yield client.query(querystring, values);
            return result.rows[0];
        });
    }
    findAccount(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const client = yield (0, databaseClient_1.databaseClient)();
            yield client.connect();
            const querystring = `SELECT * FROM users WHERE email = $1`;
            const result = yield client.query(querystring, [email]);
            return result.rows[0];
        });
    }
}
exports.userRepository = userRepository;
//# sourceMappingURL=userRepository.js.map