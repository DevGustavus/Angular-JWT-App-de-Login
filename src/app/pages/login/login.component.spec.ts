import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../core/services/login.service';
import { of, throwError } from 'rxjs';

const mockRouter = {
  navigate: jest.fn(),
};

const mockToastrService = {
  success: jest.fn(),
  error: jest.fn(),
};

const mockLoginService = {
  login: jest.fn(),
};

describe('LoginComponent (Jest)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve marcar todos os campos como tocados se o formulário estiver inválido', () => {
    const markAllAsTouchedSpy = jest.spyOn(
      component.loginForm,
      'markAllAsTouched'
    );
    component.submit();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('deve realizar login com sucesso e redirecionar', fakeAsync(() => {
    component.loginForm.setValue({
      email: 'teste@email.com',
      password: '123456',
    });

    mockLoginService.login.mockReturnValue(of({}));

    component.submit();

    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Login feito com sucesso!'
    );

    tick(1000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['users']);
  }));

  it('deve exibir mensagem de erro se o login falhar', () => {
    component.loginForm.setValue({
      email: 'teste@email.com',
      password: '123456',
    });

    mockLoginService.login.mockReturnValue(
      throwError(() => new Error('Falha'))
    );

    component.submit();

    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Erro inesperado! Tente novamente mais tarde'
    );
  });

  it('deve navegar para signup quando navigate() for chamado', () => {
    component.navigate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['signup']);
  });
});
