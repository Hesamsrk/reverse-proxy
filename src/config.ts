import {config} from "dotenv";

config()

const authentication = process.env.AUTHENTICATION
if (["0", "1", undefined].map((item) => item !== authentication).reduce((a, b) => a && b)) {
    console.error("process.env.AUTHENTICATION should be either 0 or 1 or undefined")
    process.exit(-1)
}

export const Config = {
    name: process.env.APP_NAME || "untitled",
    hostname: process.env.DATABASE_HOST || "localhost",
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
    authentication: authentication !== undefined ? Boolean(Number(authentication)) : true,
    syncDB: {
        active: process.argv.includes("--sync-db"),
        help: process.argv.includes("-h"),
        force: process.argv.includes("--force"),
        logging: process.argv.includes("--logging"),
        seeders: process.argv.includes("--seeders")
    }
} as const