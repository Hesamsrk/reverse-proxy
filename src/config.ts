import {config} from "dotenv";

config()

export const Config = {
    port: parseInt(process.env.PORT || "3000"),
    jwtSecret: process.env.JWT_SECRET || "",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
    database: {
        dialect: "mysql",
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || "3306"),
        username: process.env.DATABASE_USERNAME || "root",
        password: process.env.DATABASE_PASSWORD || "12345",
        database: process.env.DATABASE_NAME || "revereProxy",
    },
    clientUrls: (process.env.ORIGINS && process.env.ORIGINS.split(",")) || [],
} as const