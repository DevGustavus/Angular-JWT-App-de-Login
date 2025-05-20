import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LucideAngularModule, UserPlus } from 'lucide-angular';
import { User } from '../../core/models/user.model';
import { LocalHostService } from '../../core/services/local-host.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private localHostService: LocalHostService,
    private toastService: ToastrService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}
  readonly userPlus = UserPlus;
  userLogged!: User;
  isEditing: boolean = false;
  profileForm?: FormGroup;

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
    this.profileForm = this.fb.group({
      email: [
        { value: this.userLogged.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      name: [
        { value: this.userLogged.name, disabled: true },
        [Validators.required],
      ],
      role: [
        { value: Number(this.userLogged.role), disabled: true },
        [Validators.required],
      ],
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.profileForm?.enable();
  }

  onSave(): void {
    if (!this.profileForm || this.profileForm.invalid) {
      this.toastService.error('Preencha todos os campos corretamente.', 'Erro');
      return;
    }

    const updatedUser: User = {
      id: this.userLogged.id,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      role: this.profileForm.value.role,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.toastService.success('Usuário atualizado com sucesso!', 'Sucesso');
        this.localHostService.setSessionStorageItem(
          'username',
          updatedUser.name
        );
        this.localHostService.setSessionStorageItem('email', updatedUser.email);
        this.localHostService.setSessionStorageItem('role', updatedUser.role);
        this.userLogged = updatedUser;
      },
      error: () => {
        this.toastService.error('Erro ao atualizar usuário.', 'Erro');
      },
    });
    this.profileForm?.disable();
    this.isEditing = false;
  }

  navigateToUsers(): void {
    this.router.navigate(['users']);
  }
}
