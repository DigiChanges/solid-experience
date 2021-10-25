
export interface ILoginPayload
{
    email: string;
    password: string;
}

export interface IChangeForgotPasswordPayload
{
    confirmationToken: string;
    password: string;
    passwordConfirmation: string;
}
