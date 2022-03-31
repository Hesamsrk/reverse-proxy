import {ServiceConfigs} from "./src/types/service";

export const services: ServiceConfigs[] = [
    {
        name: "test1",
        hostname: "localhost",
        port: 8001,
        protocol: "http"
    },
    {
        name: "httpbin",
        hostname: "httpbin.org",
        protocol: "http"
    },

]