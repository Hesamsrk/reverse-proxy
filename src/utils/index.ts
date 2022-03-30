import * as bcrypt from "bcrypt";

export const PasswordEncoder = (password: string) => bcrypt.hashSync(password, 10)


export const validateObject = <T extends object>(object: T, keys: (keyof T)[]) => {
    const result = keys.map(key => {
        let result = (key in object) && object[key] !== undefined && object[key] !== null
        return {
            result,
            key: result ? undefined : key
        }
    })

    const isValid = result.map(res => res.result).reduce((cur, next) => cur && next)
    const invalidKeys = result.map(res => res.key).filter(key => key !== undefined)

    return {
        isValid,
        invalidKeys
    }
}
