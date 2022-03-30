import {config} from "dotenv"
import {CreateApp} from "./src/server";
import * as http from "http";
import {Config} from "./src/config";
import {SyncDB} from "./src/database/syncDB";



const main = async () => {
    await SyncDB();
    const app = CreateApp()
    http.createServer(app).listen(Config.port, () => {
        console.log(`✅ Server listening on port ${Config.port}`)
    })
}
main().then(() => {
    console.log("Setup completed!")
})


