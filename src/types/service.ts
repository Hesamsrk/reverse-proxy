export interface ServiceConfigs {
    name: string,
    hostname: string,
    protocol: "http" | "https"
    port?: number,
}