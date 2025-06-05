import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './signup.component';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let loginService: LoginService;
  let toastr: ToastrService;

  beforeEach(async () => {
    const routerMock = { navigate: jest.fn() };
    const loginServiceMock = { signup: jest.fn() };
    const toastrMock = { success: jest.fn(), error: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [SignUpComponent, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as submitted and not call signup if form is invalid', () => {
    component.signupForm.setValue({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
    component.submit();
    expect(component.formSubmitted).toBe(true);
    expect(loginService.signup).not.toHaveBeenCalled();
  });

  it('should navigate to login page on navigate()', () => {
    component.navigate();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should set passwordMismatch error if passwords do not match', () => {
    component.signupForm.get('password')?.setValue('123456');
    component.signupForm.get('passwordConfirm')?.setValue('654321');
    component.signupForm.updateValueAndValidity();
    expect(component.signupForm.errors).toEqual({ passwordMismatch: true });
  });

  it('should not set passwordMismatch error if passwords match', () => {
    component.signupForm.get('password')?.setValue('abcdef');
    component.signupForm.get('passwordConfirm')?.setValue('abcdef');
    component.signupForm.updateValueAndValidity();
    expect(component.signupForm.errors).toBeNull();
  });
});
