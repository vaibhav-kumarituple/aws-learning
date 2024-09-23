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
exports.profile = exports.verify = exports.login = exports.signup = void 0;
const tsyringe_1 = require("tsyringe");
const userService_1 = require("../services/userService");
const response_1 = require("../utility/response");
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const service = tsyringe_1.container.resolve(userService_1.userService);
exports.signup = (0, core_1.default)((event) => {
    return service.signUp(event);
}).use((0, http_json_body_parser_1.default)());
exports.login = (0, core_1.default)((event) => {
    return service.login(event);
}).use((0, http_json_body_parser_1.default)());
const verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const requesttype = event.requestContext.http.method;
    if (requesttype === response_1.requestType.POST) {
        return service.verifyUser(event);
    }
    else if (requesttype === response_1.requestType.GET) {
        return service.getVerificationToken(event);
    }
    return service.verifyUser(event);
});
exports.verify = verify;
const profile = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const requesttype = event.requestContext.http.method;
    if (requesttype === response_1.requestType.GET) {
        return service.getUserProfile(event);
    }
    else if (requesttype === response_1.requestType.POST) {
        return service.createUserProfile(event);
    }
    else if (requesttype === response_1.requestType.PUT) {
        return service.editUserProfile(event);
    }
    else
        return (0, response_1.errorResponse)(400, "Invalid request type");
});
exports.profile = profile;
//# sourceMappingURL=userhandler.js.map