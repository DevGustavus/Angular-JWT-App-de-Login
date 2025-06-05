import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultLoginLayoutComponent } from './default-login-layout.component';

describe('DefaultLoginLayoutComponent', () => {
  let component: DefaultLoginLayoutComponent;
  let fixture: ComponentFixture<DefaultLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLoginLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.title).toBe('');
    expect(component.primaryBtnText).toBe('');
    expect(component.secondaryBtnText).toBe('');
  });

  it('should emit submitEvent when submit() is called', () => {
    const submitSpy = jest.spyOn(component.submitEvent, 'emit');
    component.submit();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should emit navigateEvent when navigate() is called', () => {
    const navigateSpy = jest.spyOn(component.navigateEvent, 'emit');
    component.navigate();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
