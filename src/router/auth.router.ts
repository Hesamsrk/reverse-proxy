import express from "express";
import {JWTPayload, LoginIT, LoginOT, OT, SignupIT, SignupOT} from "../types/auth";
import {PasswordCompare, PasswordEncoder, validateObject} from "../utils";
import {User} from "../database/models/user.model";
import {sign} from "jsonwebtoken"
import {Config} from "../config";
import {Authenticate} from "../middlewares/Authenticate";

export const authRouter = express.Router()

if (Config.authentication) {
    authRouter.post("/signup", async (req, res) => {
        let input: SignupIT = req.body
        let valRes = validateObject<SignupIT>(input, ["username", "password", "email"])
        if (!valRes.isValid) {
            return res.status(422).json(
                {
                    status: false,
                    error: {
                        code: 422,
                        message: `The following keys are missing: ${valRes.invalidKeys}`
                    }
                } as SignupOT
            )
        }

        const foundUser = await User.findOne({
            where: {
                Username: input.username
            }
        })

        if (foundUser) {
            return res.status(422).json(
                {
                    status: false,
                    error: {
                        code: 422,
                        message: `A user with this username already exists!`
                    }
                } as SignupOT
            )

        }

        const createdUser = await User.create({
            Username: input.username,
            Email: input.email,
            Password: PasswordEncoder(input.password),
            FirstName: input.firstName || "",
            LastName: input.lastName || ""
        })

        return res.status(200).json(
            {
                status: true,
                body: {
                    ID: createdUser.ID
                }
            } as SignupOT
        )


    })


    authRouter.post("/login", async (req, res) => {
        let input: LoginIT = req.body
        let valRes = validateObject<LoginIT>(input, ["username", "password"])
        if (!valRes.isValid) {
            return res.status(422).json(
                {
                    status: false,
                    error: {
                        code: 422,
                        message: `The following keys are missing: ${valRes.invalidKeys}`
                    }
                } as LoginOT
            )

        }


        const foundUser = await User.findOne({
            where: {
                Username: input.username
            }
        })
        if (!foundUser) {
            return res.status(404).json(
                {
                    status: false,
                    error: {
                        code: 404,
                        message: `User not found!`
                    }
                } as LoginOT
            )

        }

        if (!PasswordCompare(foundUser.Password, input.password)) {
            return res.status(401).json(
                {
                    status: false,
                    error: {
                        code: 401,
                        message: `Password does not match!`
                    }
                } as LoginOT
            )
        }


        const token = sign(
            {userID: foundUser.ID, username: foundUser.Username} as JWTPayload,
            Config.jwtSecret,
            {
                expiresIn: "2h",
            }
        );
        foundUser.Token = token
        await foundUser.save()

        return res.status(200).json(
            {
                status: true,
                body: {
                    token
                }
            } as LoginOT
        )
    })

    authRouter
        .use("/logout", Authenticate)
        .delete("/logout", async (req, res) => {
            const user: JWTPayload = res.locals.user


            const foundUser = await User.findOne({
                where: {
                    ID: user.userID
                }
            })

            if (!foundUser) {
                res.status(404).json({
                    status: false,
                    error: {
                        code: 404,
                        message: "User not found!"
                    }
                } as OT)
            }

            foundUser.Token = null
            await foundUser.save()

            return res.status(200).json({
                status: true
            } as OT)
        })
}