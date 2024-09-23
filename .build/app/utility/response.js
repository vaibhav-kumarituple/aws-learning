"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestType = exports.errorResponse = exports.successResponse = void 0;
const formatResponse = (statusCode, message, data) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(Object.assign({ message }, (data && { data }))),
});
const successResponse = (data) => {
    return formatResponse(200, "Success", data);
};
exports.successResponse = successResponse;
const errorResponse = (code, error) => {
    console.log("error", error);
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || "Something went wrong";
        return formatResponse(code, errorMessage);
    }
};
exports.errorResponse = errorResponse;
var requestType;
(function (requestType) {
    requestType["GET"] = "GET";
    requestType["POST"] = "POST";
    requestType["PUT"] = "PUT";
    requestType["DELETE"] = "DELETE";
})(requestType || (exports.requestType = requestType = {}));
//# sourceMappingURL=response.js.map