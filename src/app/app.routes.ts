/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ProfileComponent } from './pages/profile/profile.component';

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
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile | APP',
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
