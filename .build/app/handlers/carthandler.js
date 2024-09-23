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
exports.cart = void 0;
const cartService_1 = require("../services/cartService");
const response_1 = require("../utility/response");
const service = new cartService_1.CartService();
const cart = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === response_1.requestType.GET)
        return service.getCart(event);
    else if (httpMethod === response_1.requestType.POST)
        return service.createCart(event);
    else if (httpMethod === response_1.requestType.PUT)
        return service.updateCart(event);
    else
        return (0, response_1.errorResponse)(400, "Invalid request type");
});
exports.cart = cart;
//# sourceMappingURL=carthandler.js.map