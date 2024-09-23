import { container } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { userService } from "../services/userService";
import { errorResponse, requestType } from "../utility/response";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const service = container.resolve(userService);

export const signup = middy((event: APIGatewayProxyEventV2) => {
    return service.signUp(event);
}).use(jsonBodyParser());

export const login = middy((event: APIGatewayProxyEventV2) => {
    return service.login(event);
}).use(jsonBodyParser());

export const verify = async (event: APIGatewayProxyEventV2) => {
    const requesttype = event.requestContext.http.method;
    if (requesttype === requestType.POST) {
        return service.verifyUser(event);
    } else if (requesttype === requestType.GET) {
        return service.getVerificationToken(event);
    }
    return service.verifyUser(event);
};

export const profile = async (event: APIGatewayProxyEventV2) => {
    const requesttype = event.requestContext.http.method;
    if (requesttype === requestType.GET) {
        return service.getUserProfile(event);
    } else if (requesttype === requestType.POST) {
        return service.createUserProfile(event);
    } else if (requesttype === requestType.PUT) {
        return service.editUserProfile(event);
    } else return errorResponse(400, "Invalid request type");
};
