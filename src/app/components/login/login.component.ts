import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { SignInRequest } from '../../domains/Patient';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  showErrorModal = false;
  loginForm! : FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn() {
    const fomrData: SignInRequest = {
      email: this.email?.value,
      password: this.password?.value,
    };

    console.log(fomrData);

    this.authService.login(fomrData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.showErrorModal = true;
      },
    });
  }
}
