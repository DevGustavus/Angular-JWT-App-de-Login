/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../core/models/user.model';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../../core/services/user.service';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { LocalHostService } from '../../core/services/local-host.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    LucideAngularModule,
    MatExpansionModule,
    ConfirmComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @Output() rowClicked = new EventEmitter<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ConfirmComponent) confirmModal!: ConfirmComponent;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  users: User[] = [];
  visibleUsers: User[] = []; // visível no mobile
  loadIndex = 0;
  loadAmount = 10;
  selectedUser?: User;
  userRole: number = 1;
  executorId = '';
  isMobile: boolean = false;

  readonly trash2 = Trash2;

  dataSource = new MatTableDataSource<User>([]);

  private readonly userService = inject(UserService);
  private readonly localHostService = inject(LocalHostService);

  ngOnInit() {
    const roleFromSession = this.localHostService.getSessionStorageItem('role');
    this.userRole = roleFromSession ? parseInt(roleFromSession) : 1;
    this.executorId = this.localHostService.getSessionStorageItem('id') ?? '';

    this.isMobile = window.innerWidth <= 768;

    this.userService.getAllUsers().subscribe({
      next: response => {
        this.users = response.body ?? [];

        // para mobile
        if (this.isMobile) {
          this.loadIndex = this.loadAmount;
          this.visibleUsers = this.users.slice(0, this.loadAmount);
        }

        // para desktop (com tabela e paginação)
        this.dataSource.data = this.users;
      },
      error: err => {
        console.error('Erro ao buscar usuários', err);
      },
    });
  }

  onRowClicked(row: User): void {
    this.rowClicked.emit(row);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMoreUsers(): void {
    const nextIndex = this.loadIndex + this.loadAmount;
    this.visibleUsers = this.users.slice(0, nextIndex);
    this.loadIndex = nextIndex;
  }

  showDeleteConfirm(user: User): void {
    if (this.userRole === 2 && Number(user.role) !== 2) {
      this.selectedUser = user;
      this.confirmModal.open();
    } else {
      alert('Você não tem permissão para excluir este usuário.');
    }
  }

  onConfirmDelete(): void {
    if (!this.selectedUser) return;

    this.userService
      .deleteUserById(this.selectedUser.id, this.executorId)
      .subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.selectedUser!.id);
          this.dataSource.data = this.users;
          this.visibleUsers = this.visibleUsers.filter(
            u => u.id !== this.selectedUser!.id
          );
          this.selectedUser = undefined;
        },
        error: err => {
          console.error('Erro ao deletar usuário', err);
        },
      });
  }
}
