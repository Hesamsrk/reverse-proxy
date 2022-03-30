import {Sequelize} from "sequelize-typescript";
import {Config} from "../config";

export const sequelize = new Sequelize({
    ...Config.database,
    logging: false,
    dialectOptions: {
        multipleStatements: true,
    },
    models: [__dirname + "/models/**/*.model.ts"],
    modelMatch: (filename, member) => {
        return (
            filename.substring(0, filename.indexOf(".model")) ===
            member.charAt(0).toLowerCase() + member.substring(1)
        );
    },
});
