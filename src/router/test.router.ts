import express from "express";
import {Config} from "../config";
import {OT} from "../types/auth";

export const testRouter = express.Router()


testRouter.all("/introduce", (req, res) => {
    const {hostname, name, port} = Config
    return res.status(200).json({
        status: true,
        body: {hostname, name, port}
    } as OT)
})



