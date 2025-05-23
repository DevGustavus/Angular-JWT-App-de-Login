import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LogOut, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly logOut = LogOut;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toast: ToastrService
  ) {}

  navigateToStart(): void {
    this.router.navigate(['']);
  }

  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    this.loginService.logout();
    this.toast.success('Logout successful', 'Success');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
