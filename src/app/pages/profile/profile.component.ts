import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LucideAngularModule, UserPlus } from 'lucide-angular';
import { User } from '../../core/models/user.model';
import { LocalHostService } from '../../core/services/local-host.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private localHostService: LocalHostService,
    private toastService: ToastrService
  ) {}
  readonly userPlus = UserPlus;
  userLogged!: User;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.userLogged = {
      id: this.localHostService.getSessionStorageItem('id') || '',
      name: this.localHostService.getSessionStorageItem('username') || '',
      email: this.localHostService.getSessionStorageItem('email') || '',
      role: this.localHostService.getSessionStorageItem('role') || '',
    };
    if (
      !this.userLogged.id ||
      !this.userLogged.name ||
      !this.userLogged.email ||
      !this.userLogged.role
    ) {
      this.toastService.error('Erro: Falha ao carregar informações.', 'Erro');
    }
  }

  navigateToUsers(): void {
    this.router.navigate(['users']);
  }
}
