import { CartService } from "../services/cartService";
import { errorResponse, requestType } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
const service = new CartService();

export const cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === requestType.GET) return service.getCart(event);
    else if (httpMethod === requestType.POST) return service.createCart(event);
    else if (httpMethod === requestType.PUT) return service.updateCart(event);
    else return errorResponse(400, "Invalid request type");
};
