import express from "express";
import {JWTPayload, LoginIT, LoginOT, SignupIT, SignupOT} from "../types/auth";
import {PasswordEncoder, validateObject} from "../utils";
import {User} from "../database/models/user.model";
import {sign} from "jsonwebtoken"
import {Config} from "../config";
import {Authenticate} from "../utils/auth";

export const authRouter = express.Router()

authRouter.all("/", (req, res) => res.json("Auth!"))

authRouter.post("/signup", async (req, res) => {
    let input: SignupIT = req.body
    let valRes = validateObject<SignupIT>(input, ["username", "password", "email"])
    if (!valRes.isValid) {
        res.status(422).json(
            {
                status: false,
                error: {
                    code: 422,
                    message: `The following keys are missing: ${valRes.invalidKeys}`
                }
            } as SignupOT
        )
        return
    }

    const foundUser = await User.findOne({
        where: {
            Username: input.username
        }
    })

    if (foundUser) {
        res.status(422).json(
            {
                status: false,
                error: {
                    code: 422,
                    message: `A user with this username already exists!`
                }
            } as SignupOT
        )
        return
    }

    const createdUser = await User.create({
        Username: input.username,
        Email: input.email,
        Password: PasswordEncoder(input.password),
        FirstName: input.firstName || "",
        LastName: input.lastName || ""
    })

    res.status(200).json(
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
        res.status(422).json(
            {
                status: false,
                error: {
                    code: 422,
                    message: `The following keys are missing: ${valRes.invalidKeys}`
                }
            } as LoginOT
        )
        return
    }


    const foundUser = await User.findOne({
        where: {
            Username: input.username
        }
    })
    if (!foundUser) {
        res.status(404).json(
            {
                status: false,
                error: {
                    code: 404,
                    message: `User not found!`
                }
            } as LoginOT
        )
        return
    }
    const encodedPassword = PasswordEncoder(input.password)
    if (foundUser.Password !== encodedPassword) {
        res.status(401).json(
            {
                status: false,
                error: {
                    code: 401,
                    message: `Password does not match!`
                }
            } as LoginOT
        )
        return
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

    res.status(200).json(
        {
            status: true,
            body: {
                token
            }
        } as LoginOT
    )
})

Authenticate(authRouter, "/logout")
authRouter.post("/logout", (req, res) => {

})