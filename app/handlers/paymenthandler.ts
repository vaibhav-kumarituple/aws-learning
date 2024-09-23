import { PaymentService } from "../services/paymentService";
import { errorResponse, requestType } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
const service = new PaymentService();

export const payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === requestType.GET) return service.getPayment(event);
    else if (httpMethod === requestType.POST)
        return service.createPayment(event);
    else if (httpMethod === requestType.PUT)
        return service.updatePayment(event);
    else return errorResponse(400, "Invalid request type");
};
