interface ILogin {
    email: string;
    password: string;
    code?: string
}

interface IRegister {
    email: string;
    fullname: string;
    password: string;
}

interface INewPassword {
    oldPassword: string;
    newPassword: string;
}


export type {ILogin, INewPassword, IRegister}