interface ILogin {
    email: string;
    password: string;
    code?: string
}

interface INewPassword {
    oldPassword: string;
    newPassword: string;
}


export type {ILogin, INewPassword}