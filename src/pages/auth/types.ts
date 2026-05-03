export interface LoginFormData extends Record<string, string> {
    email: string;
    password: string;
}

export interface RegisterFormData extends Record<string, string> {
    userName: string;
    email: string;
    password: string;
}
