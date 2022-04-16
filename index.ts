import {CreateApp} from "./src/server";
import * as http from "http";
import {Config} from "./src/config";
import {SyncDB} from "./src/database/syncDB";


const main = async () => {
    console.log("App configs:", Config)
    if (Config.authentication) {
        await SyncDB();
    } else if (Config.syncDB.active) {
        console.error("SyncDB does not work when authentication is disabled!")
        process.exit(-2)
    }
    const app = CreateApp()
    http.createServer(app).listen(Config.port, () => {
        console.log(`✅ Server listening on port ${Config.port}`)
    })
}
main().then(() => {
    console.log("Setup completed!")
})


