import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | APP',
  },
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
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users | APP',
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
