import express from "express";
import {authRouter} from "./auth.router";
import {proxyRouter} from "./proxy.router";
import {Authenticate} from "../middlewares/Authenticate";
import {testRouter} from "./test.router";
import {Config} from "../config";

export const router = () => {
    const router = express.Router()
    if (Config.authentication) {
        router.use("/auth", authRouter)
    }
    router.use("/test", testRouter)
    router.use("/proxy", proxyRouter)

    return router
}
