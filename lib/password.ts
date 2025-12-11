import bcrypt from "bcryptjs"

export const hashPassword = (password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 16)
    return hashedPassword
}
export const isPasswordMatch = (password: string, hashedPassword: string) => {
    const res = bcrypt.compareSync(password, hashedPassword)
    return res
}