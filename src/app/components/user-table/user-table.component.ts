/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../core/models/user.model';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { MatExpansionModule } from '@angular/material/expansion';

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
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isMobile: boolean = false;
  readonly trash2 = Trash2;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }

  users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'user',
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      role: 'user',
    },
    {
      id: '5',
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      role: 'admin',
    },
    {
      id: '6',
      name: 'Diana Evans',
      email: 'diana.evans@example.com',
      role: 'user',
    },
    {
      id: '7',
      name: 'Eve Foster',
      email: 'eve.foster@example.com',
      role: 'user',
    },
    {
      id: '8',
      name: 'Frank Green',
      email: 'frank.green@example.com',
      role: 'admin',
    },
    {
      id: '9',
      name: 'Grace Harris',
      email: 'grace.harris@example.com',
      role: 'user',
    },
    {
      id: '10',
      name: 'Henry Irving',
      email: 'henry.irving@example.com',
      role: 'user',
    },
  ];

  dataSource = new MatTableDataSource<User>(this.users);

  onRowClicked(row: User): void {
    this.rowClicked.emit(row);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
