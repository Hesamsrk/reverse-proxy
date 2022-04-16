import {seeder} from "./seeders";
import {sequelize} from "./index";
import {Config} from "../config";

interface Flag {
    value: string;
    intro: string;
}

const flags: Flag[] = [
    {
        value: "-h",
        intro: "for help",
    },
    {
        value: "--logging",
        intro: "to activate logging system",
    },
    {
        value: "--seeders",
        intro: "to activate seeders",
    },
    {
        value: "--force",
        intro:
            "to activate force mode in sequelize. This mode drops all the tables of your database before reinitialization",
    },
];

export const SyncDB = async () => {
    if (Config.syncDB.active) {
        if (Config.syncDB.help) {
            for (let flag of flags) {
                console.log(`- \`${flag.value}\` ${flag.intro}.\n`);
            }
            process.exit(0);
        }

        const options = {
            force: Config.syncDB.force,
            logging: Config.syncDB.logging,
            alter: true,
        };

        try {
            await sequelize.sync(options);
            console.log("✅ Database schema updated!");
            if (Config.syncDB.seeders) {
                await seeder();
                console.log("✅ Database seed completed!");
            }
            process.exit(0);
        } catch (e) {
            console.error("Error accrued while syncing database:\n", e);
            process.exit(1);
        }
    } else {
        sequelize
            .authenticate()
            .then(() => {
                console.log("✅ Database connected!");
            })
            .catch(e => {
                console.log("❌ Database connection failed!\n", e);
            });
    }
};
