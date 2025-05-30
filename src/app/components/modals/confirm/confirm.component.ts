import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [LucideAngularModule, NgIf],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  readonly alertIcon = TriangleAlert;

  open(): void {
    this.dialogRef?.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef?.nativeElement.close();
  }

  ConfirmEvent(): void {
    this.confirmed.emit();
    this.close();
  }

  closeModal(): void {
    this.cancelled.emit();
    this.close();
  }
}
