import { Component, computed } from '@angular/core';
import { LoadingService } from '../../core/interceptors/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  isLoading = computed(() => this.loadingService.loading());

  constructor(private loadingService: LoadingService) {}
}
