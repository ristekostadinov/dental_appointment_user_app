import { Form, FormControl} from "@angular/forms";

export interface IHomePageForm{
    location: FormControl<string>;
    category: FormControl<string>;
}

export interface IRegisterForm{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    insurance: string;
    password: string;
}

export interface ILoginForm{
    email: FormControl<string>;
    password: FormControl<string>;
}