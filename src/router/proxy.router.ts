import express from "express";
import {services} from "../../services.config"
import {createProxyServer} from "http-proxy"

export const proxyRouter = express.Router()

const proxyServer = createProxyServer()


for (const service of services) {
    proxyRouter.use(`/${service.name}`, async (req, res) => {
        console.log(`redirecting to ${service.name}`);
        proxyServer.web(req, res, {target: `${service.protocol}://${service.hostname}${service.port ? `:${service.port}` : ""}`});
    })
}




