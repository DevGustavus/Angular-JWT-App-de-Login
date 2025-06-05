import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmComponent } from './confirm.component';
import { By } from '@angular/platform-browser';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.title).toBe('Confirm');
    expect(component.message).toBe('Are you sure?');
    expect(component.confirmText).toBe('Yes');
    expect(component.cancelText).toBe('No');
  });

  it('should open dialog when open() is called', () => {
    component.dialogRef = {
      nativeElement: {
        showModal: jest.fn(),
      },
    } as any;

    component.open();
    expect(component.dialogRef.nativeElement.showModal).toHaveBeenCalled();
  });

  it('should close dialog when close() is called', () => {
    component.dialogRef = {
      nativeElement: {
        close: jest.fn(),
      },
    } as any;

    component.close();
    expect(component.dialogRef.nativeElement.close).toHaveBeenCalled();
  });

  it('should emit confirmed event and close dialog on ConfirmEvent()', () => {
    component.dialogRef = {
      nativeElement: {
        close: jest.fn(),
      },
    } as any;

    const confirmedSpy = jest.spyOn(component.confirmed, 'emit');

    component.ConfirmEvent();

    expect(confirmedSpy).toHaveBeenCalled();
    expect(component.dialogRef.nativeElement.close).toHaveBeenCalled();
  });

  it('should emit cancelled event and close dialog on closeModal()', () => {
    component.dialogRef = {
      nativeElement: {
        close: jest.fn(),
      },
    } as any;

    const cancelledSpy = jest.spyOn(component.cancelled, 'emit');

    component.closeModal();

    expect(cancelledSpy).toHaveBeenCalled();
    expect(component.dialogRef.nativeElement.close).toHaveBeenCalled();
  });
});
