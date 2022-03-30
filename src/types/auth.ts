export interface OT<T extends object> {
    status: boolean
    body?: T
    error?: {
        code: number
        message: string
    }
}

export interface SignupIT {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export type SignupOT = OT<{
    ID: number
}>

export interface LoginIT {
    username: string;
    password: string;
}

export interface JWTPayload {
    userID: number,
    username: string,
}

export type LoginOT = OT<{ token: string }>