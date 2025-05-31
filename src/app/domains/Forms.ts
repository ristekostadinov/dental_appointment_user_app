import { Form, FormControl} from "@angular/forms";

export interface IHomePageForm{
    location: FormControl<string>;
    category: FormControl<string>;
}