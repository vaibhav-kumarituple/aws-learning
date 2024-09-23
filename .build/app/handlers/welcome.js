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
exports.welcome = void 0;
const response_1 = require("../utility/response");
const welcome = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("event info : ", event);
    return (0, response_1.successResponse)({
        message: "Welcome to the serverless world!",
    });
});
exports.welcome = welcome;
//# sourceMappingURL=welcome.js.map