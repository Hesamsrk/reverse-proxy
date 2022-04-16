import express from "express";
import {services} from "../../services.config"
import {createProxyServer} from "http-proxy"
import {Authenticate} from "../middlewares/Authenticate";

export const proxyRouter = express.Router()

const proxyServer = createProxyServer({timeout: 3000})


for (const service of services) {
    if (service.authentication) {
        proxyRouter.use(`/${service.name}`, Authenticate)
    }
    proxyRouter.use(`/${service.name}`, async (req, res) => {
        const target = `${service.protocol}://${service.hostname}${service.port ? `:${service.port}` : ""}`
        console.log(`proxy => ${target}`);
        proxyServer.web(req, res, {target});
        proxyServer.on("error", (e) => {
            console.error(`Proxy to ${service.name} failed:`)
            console.error(e)
        })
    })
}




