import { APIGatewayProxyEventV2 } from "aws-lambda";
import { successResponse } from "../utility/response";

export class PaymentService {
    async createPayment(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Payment created successfully",
        });
    }

    async getPayment(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Payment fetched successfully",
        });
    }

    async updatePayment(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Payment updated successfully",
        });
    }
}
