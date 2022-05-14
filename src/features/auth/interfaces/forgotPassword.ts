export interface ForgotPasswordPayload
{
    email: string;
    tenant: string;
}

export interface ChangeForgotPasswordPayload
{
    confirmationToken: string;
    password: string;
    passwordConfirmation: string;
}
