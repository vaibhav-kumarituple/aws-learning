import { Client } from "pg";

export const databaseClient = async () => {
    return new Client({
        user: "root",
        host: "127.0.0.1",
        database: "user_service",
        password: "root",
        port: 5432,
    });
};

export const connectToDatabase = async () => {
    const client = await databaseClient();
    await client.connect();
    console.log("Connected to the database successfully!");
    return client;
};
