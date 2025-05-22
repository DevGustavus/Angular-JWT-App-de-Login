import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { SignupForm } from '../../core/interfaces/signupForm';
import { ToastrService } from 'ngx-toastr';
import { noWhitespaceValidator } from '../../core/utils/noWhitespaceValidator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent {
  formSubmitted = false;

  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        noWhitespaceValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        noWhitespaceValidator,
      ]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.passwordsMatchValidator],
    }
  );

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  submit(): void {
    this.formSubmitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loginService
      .signup(
        this.signupForm.value.name!,
        this.signupForm.value.email!,
        this.signupForm.value.password!
      )
      .subscribe({
        next: () => this.toastService.success('Cadastro feito com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          ),
      });
  }

  navigate(): void {
    this.router.navigate(['login']);
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;

    return password === passwordConfirm ? null : { passwordMismatch: true };
  }
}
