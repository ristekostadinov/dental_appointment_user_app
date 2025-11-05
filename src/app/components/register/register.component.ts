import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';
import { IRegisterForm } from '../../domains/Forms';
import { SignUpRequest } from '../../domains/Patient';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showErrorModal = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.nonNullable.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[- +()0-9]+$')],
      ],
      insurance: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  convertToBolean(param: string): boolean {
    if (param == 'true') return true;
    return false;
  }

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get insurance() {
    return this.registerForm.get('insurance') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  createAccount() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData : SignUpRequest = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      insurance: this.convertToBolean(this.insurance.value),
      password: this.password.value,
    };

    this.authService.signUp(formData).subscribe({
      next: (response) => {
        console.log('Account created successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error creating account:', error);
        this.showErrorModal = true;
      },
    });
  }
}
