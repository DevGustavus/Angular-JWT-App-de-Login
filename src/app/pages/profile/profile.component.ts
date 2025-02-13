import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LucideAngularModule, UserPlus } from 'lucide-angular';
import { User } from '../../core/models/user.model';
import { LocalHostService } from '../../core/services/local-host.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private localHostService: LocalHostService
  ) {}
  readonly userPlus = UserPlus;
  userLogged: User | null = null;

  ngOnInit(): void {
    const id = this.localHostService.getSessionStorageItem('id');
    const username = this.localHostService.getSessionStorageItem('username');
    const email = this.localHostService.getSessionStorageItem('email');
    const role = this.localHostService.getSessionStorageItem('role');

    if (id && username && email && role) {
      this.userLogged = {
        id,
        name: username,
        email,
        role,
      };
    }
  }

  navigateToUsers(): void {
    this.router.navigate(['users']);
  }
}
