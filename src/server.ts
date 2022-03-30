import express from "express"
import {router} from "./router"
import path from "path";
import cors from "cors";
import {Config} from "./config";
import morgan from "morgan";

export const CreateApp = () => {
    const app = express()
    app.use(cors({origin: Config.clientUrls}));
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())
    app.use(morgan('tiny'))
    app.use(router())
    return app
}


