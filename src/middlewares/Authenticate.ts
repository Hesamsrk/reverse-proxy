import {RequestHandler} from "express";
import {JWTPayload, OT} from "../types/auth";
import {verify} from "jsonwebtoken"
import {Config} from "../config";
import {User} from "../database/models/user.model";

export const Authenticate: RequestHandler = Config.authentication ?
    (async (req, res, next) => {
        const token = String(req.headers["authorization"]).replace(/[b|B]earer/, "").replace(/\s/g, "")
        if (!token) {
            return res.status(403).json(
                {
                    status: false,
                    error: {
                        code: 403,
                        message: "Request must contain Authorization header."
                    }
                } as OT
            );
        }

        try {
            const decoded = verify(token, Config.jwtSecret) as JWTPayload;
            if (decoded.userID) {
                const foundUser = await User.findOne({
                    where: {
                        ID: decoded.userID
                    }
                })
                if (!foundUser.Token || foundUser.Token !== token) {
                    return res.status(401).json(
                        {
                            status: false,
                            error: {
                                code: 401,
                                message: "Invalid Authorization token."
                            }
                        } as OT
                    );
                }

                res.locals.user = {
                    userID: decoded.userID,
                    username: decoded.username
                }
            }

        } catch (err) {
            return res.status(401).json(
                {
                    status: false,
                    error: {
                        code: 401,
                        message: "Invalid Authorization token."
                    }
                } as OT
            );
        }
        return next();
    })
    : ((req, res, next) => next())