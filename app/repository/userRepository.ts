import { userModel } from "../models/UserModel";
import { databaseClient } from "../utility/databaseClient";

export class userRepository {
    async createAccount({ phone, email, password, salt, userType }: userModel) {
        const client = await databaseClient();
        await client.connect();

        const querystring = `INSERT INTO users(phone, email, password, salt, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const values = [phone, email, password, salt, userType];
        const result = await client.query(querystring, values);

        return result.rows[0];
    }

    async findAccount({ email }: { email: string }) {
        const client = await databaseClient();
        await client.connect();
        const querystring = `SELECT * FROM users WHERE email = $1`;
        const result = await client.query(querystring, [email]);

        return result.rows[0] as userModel;
    }
}
