import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-confirm',
  template: '',
  standalone: true,
})
class MockConfirmComponent {
  open = jest.fn();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: jest.Mocked<Router>;
  let loginService: jest.Mocked<LoginService>;
  let toastr: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    loginService = {
      logout: jest.fn(),
    } as unknown as jest.Mocked<LoginService>;

    toastr = {
      success: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: LoginService, useValue: loginService },
        { provide: ToastrService, useValue: toastr },
      ],
    })
      .overrideComponent(HeaderComponent, {
        set: {
          imports: [MockConfirmComponent, LucideAngularModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.logoutModal = new MockConfirmComponent() as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to users', () => {
    component.navigateToUsers();
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should navigate to profile', () => {
    component.navigateToProfile();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should open logout modal', () => {
    component.openLogoutModal();
    expect(component.logoutModal.open).toHaveBeenCalled();
  });

  it('should call logout and navigate to login after confirm', done => {
    component.confirmLogout();

    expect(loginService.logout).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Logout successful', 'Success');

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 1001);
  });

  it('should do nothing on cancelLogout', () => {
    expect(component.cancelLogout()).toBeUndefined();
  });
});
