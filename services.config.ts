import {ServiceConfigs} from "./src/types/service";

export const services: ServiceConfigs[] = [
    {
        name: "httpbin",
        hostname: "httpbin.org",
        protocol: "http",
        authentication: true
    },
    {
        name: "topicModeling",
        hostname: "5.63.8.86:5001",
        protocol: "http",
        authentication: false
    }
]