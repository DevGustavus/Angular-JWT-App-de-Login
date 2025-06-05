/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryInputComponent } from './primary-input.component';
import { ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';

class MockNgControl extends NgControl {
  control = new FormControl('');
  viewToModelUpdate() {}
}

describe('PrimaryInputComponent', () => {
  let component: PrimaryInputComponent;
  let fixture: ComponentFixture<PrimaryInputComponent>;
  let mockNgControl: MockNgControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryInputComponent);
    component = fixture.componentInstance;

    mockNgControl = new MockNgControl();
    (component as any).ngControl = mockNgControl;
    mockNgControl.valueAccessor = component;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value and call onChange on input', () => {
    const mockEvent = {
      target: { value: 'test value' },
    } as unknown as Event;

    const onChangeSpy = jest.fn();
    component.onChange = onChangeSpy;

    component.onInput(mockEvent);

    expect(component.value).toBe('test value');
    expect(onChangeSpy).toHaveBeenCalledWith('test value');
  });

  it('should write value', () => {
    component.writeValue('new value');
    expect(component.value).toBe('new value');
  });

  it('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });
});
