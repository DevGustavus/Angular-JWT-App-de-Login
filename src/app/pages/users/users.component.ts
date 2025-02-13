/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild, computed } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/interceptors/loading.service';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    UserTableComponent,
    CommonModule,
    LucideAngularModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  @ViewChild('userModal') userModal!: ElementRef<HTMLDialogElement>;
  readonly alertIcon = TriangleAlert;

  constructor(
    private toastService: ToastrService,
    private loadingService: LoadingService
  ) {}

  userSelected: any = null;

  isLoading = computed(() => this.loadingService.loading());

  onUserRowClicked(user: any): void {
    this.loadingService.show();

    setTimeout(() => {
      this.userSelected = user;

      if (this.userModal?.nativeElement) {
        this.userModal.nativeElement.showModal();
      } else {
        this.toastService.error('Modal is not available');
      }

      this.loadingService.hide();
    }, 500);
  }

  closeModal(): void {
    if (this.userModal?.nativeElement) {
      this.userModal.nativeElement.close();
    }
  }
}
