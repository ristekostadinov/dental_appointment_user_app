export interface Patient{
    username: string;
}

export interface SignInRequest{
    email: string;
    password: string;
}

export interface SignUpRequest{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    insurance: boolean;
    password: string;
}