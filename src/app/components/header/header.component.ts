import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LogOut, LucideAngularModule } from 'lucide-angular';
import { ConfirmComponent } from '../modals/confirm/confirm.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, ConfirmComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('logoutModal') logoutModal!: ConfirmComponent;
  readonly logOut = LogOut;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toast: ToastrService
  ) {}

  navigateToUsers(): void {
    this.router.navigate(['users']);
  }

  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  openLogoutModal(): void {
    this.logoutModal.open();
  }

  confirmLogout(): void {
    this.loginService.logout();
    this.toast.success('Logout successful', 'Success');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  cancelLogout(): void {
    // Nenhuma ação necessária ao cancelar.
  }
}
