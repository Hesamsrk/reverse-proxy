import {seedUsers} from "./user.seed";

export const seeder = async () => {
    await seedUsers();
};
