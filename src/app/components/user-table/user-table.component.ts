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

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    LucideAngularModule,
    MatExpansionModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @Output() rowClicked = new EventEmitter<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  users: User[] = [];
  visibleUsers: User[] = []; // visível no mobile
  loadIndex = 0;
  loadAmount = 10;

  isMobile: boolean = false;
  readonly trash2 = Trash2;

  dataSource = new MatTableDataSource<User>([]);

  private readonly userService = inject(UserService);

  ngOnInit() {
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

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.userService.deleteUserById(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.dataSource.data = this.users;
        },
        error: err => {
          console.error('Error deleting user', err);
        },
      });
    }
  }

  loadMoreUsers(): void {
    const nextIndex = this.loadIndex + this.loadAmount;
    this.visibleUsers = this.users.slice(0, nextIndex);
    this.loadIndex = nextIndex;
  }
}
