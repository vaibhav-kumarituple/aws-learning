import { APIGatewayProxyEventV2 } from "aws-lambda";
import { successResponse } from "../utility/response";

export class CartService {
    // Create a new cart
    async createCart(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Cart created successfully",
        });
    }

    // Get cart by user ID
    async getCart(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Cart fetched successfully",
        });
    }

    // Update cart
    async updateCart(event: APIGatewayProxyEventV2) {
        return successResponse({
            message: "Cart updated successfully",
        });
    }
}
