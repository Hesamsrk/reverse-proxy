import express from "express";
import {authRouter} from "./auth.router";
import {proxyRouter} from "./proxy.router";
import {Authenticate} from "../middlewares/Authenticate";
import {testRouter} from "./test.router";

export const router = () => {
    const router = express.Router()
    router.use("/auth", authRouter)
    router.use("/test", testRouter)
    router
        .use("/proxy", Authenticate)
        .use("/proxy", proxyRouter)

    return router
}
