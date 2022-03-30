import express from "express";
import {authRouter} from "./auth.router";

export const router = () => {
    const router = express.Router()
    return router.use("/auth",authRouter)
}
