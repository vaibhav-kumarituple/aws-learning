export interface userModel {
    user_id?: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    userType: "BUYER" | "SELLER";
}
export enum userType {
    BUYER = "BUYER",
    SELLER = "SELLER",
}
