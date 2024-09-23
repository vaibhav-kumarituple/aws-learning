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
exports.CartService = void 0;
const response_1 = require("../utility/response");
class CartService {
    // Create a new cart
    createCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Cart created successfully",
            });
        });
    }
    // Get cart by user ID
    getCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Cart fetched successfully",
            });
        });
    }
    // Update cart
    updateCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Cart updated successfully",
            });
        });
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cartService.js.map