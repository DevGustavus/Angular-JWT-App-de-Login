import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss',
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;

  @Output() submitEvent = new EventEmitter();
  @Output() navigateEvent = new EventEmitter();

  submit(): void {
    this.submitEvent.emit();
  }

  navigate(): void {
    this.navigateEvent.emit();
  }
}
