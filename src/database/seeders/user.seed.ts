import {User} from "../models/user.model";
import {PasswordEncoder} from "../../utils";

export const seedUsers = async () => {
    try {
        if ((await User.findAll()).length !== 0) return;

        const password = "@Aa123";
        const hashedPassword = PasswordEncoder(password);
        const newUser = await User.bulkCreate<User>([
            {
                Username: "admin",
                FirstName: "admin",
                LastName: "admin",
                Password: hashedPassword,
                Email:"admin@gmail.com",
            },
            {
                Username: "hesamsrk",
                FirstName: "Hesam",
                LastName: "Sarkhosh",
                Password: hashedPassword,
                Email:"hesamsrk@gmail.com",
            }
        ]);
        console.log(`✅ User created successfully:`);
        console.log();
    } catch (e) {
        console.error("❌ Users seeder failed!\n", e);
    }
};
