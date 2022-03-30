import { createPool } from "mysql2";
import { Config } from "../config";
import * as util from "util";
import { seeder } from "./seeders";
import { sequelize } from "./index";

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
  if (process.argv.includes("--sync-db")) {
    if (process.argv.includes("-h")) {
      for (let flag of flags) {
        console.log(`- \`${flag.value}\` ${flag.intro}.\n`);
      }
      process.exit(0);
    }

    const options = {
      force: process.argv.includes("--force"),
      logging: process.argv.includes("--logging"),
      alter: true,
    };
    const seeders = process.argv.includes("--seeders");

    try {
      const connection = await createPool({
        user: Config.database.username,
        password: Config.database.password,
      });
      const query = util.promisify(connection.query).bind(connection);
      await query(`CREATE DATABASE IF NOT EXISTS ${Config.database.database}`);
      await sequelize.sync(options);
      console.log("✅ Database schema updated!");
      if (seeders) {
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
