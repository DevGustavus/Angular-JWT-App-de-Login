import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | APP',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'SignUp | APP',
  },
];
