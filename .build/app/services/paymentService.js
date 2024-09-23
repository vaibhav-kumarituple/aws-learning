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
exports.PaymentService = void 0;
const response_1 = require("../utility/response");
class PaymentService {
    createPayment(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Payment created successfully",
            });
        });
    }
    getPayment(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Payment fetched successfully",
            });
        });
    }
    updatePayment(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({
                message: "Payment updated successfully",
            });
        });
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=paymentService.js.map