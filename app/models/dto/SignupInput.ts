import { LoginInput } from "./loginInput";
import { IsEmail, isEmail, Length } from "class-validator";
export class SignupInput extends LoginInput {
    @IsEmail()
    email: string;
    @Length(10, 20)
    phone: string;
}
