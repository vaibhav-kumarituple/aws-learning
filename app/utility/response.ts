const formatResponse = (
    statusCode: number,
    message: string,
    data?: unknown,
) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
        message,
        ...(data && { data }),
    }),
});

export const successResponse = (data: object) => {
    return formatResponse(200, "Success", data);
};

export const errorResponse = (code: number, error: unknown) => {
    console.log("error", error);
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        const errorMessage =
            errorObject[Object.keys(errorObject)[0]] || "Something went wrong";
        return formatResponse(code, errorMessage);
    }
};
export enum requestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
