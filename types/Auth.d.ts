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
    code?: string;
}

interface INewPasswordExtended extends INewPassword {
    email: string | undefined;
}


export type {ILogin, INewPassword, IRegister, INewPasswordExtended}