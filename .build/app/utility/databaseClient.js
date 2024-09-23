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
exports.connectToDatabase = exports.databaseClient = void 0;
const pg_1 = require("pg");
const databaseClient = () => __awaiter(void 0, void 0, void 0, function* () {
    return new pg_1.Client({
        user: "root",
        host: "127.0.0.1",
        database: "user_service",
        password: "root",
        port: 5432,
    });
});
exports.databaseClient = databaseClient;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, exports.databaseClient)();
    yield client.connect();
    console.log("Connected to the database successfully!");
    return client;
});
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=databaseClient.js.map