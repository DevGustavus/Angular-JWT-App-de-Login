import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';
import { LocalHostService } from '../../core/services/local-host.service';
import { HttpClientModule } from '@angular/common/http';

const mockRouter = {
  navigate: jest.fn(),
};

const mockLocalHostService = {
  getSessionStorageItem: jest.fn(),
  setSessionStorageItem: jest.fn(),
};

const mockToastrService = {
  error: jest.fn(),
  success: jest.fn(),
};

const mockUserService = {
  updateUser: jest.fn(),
};

describe('ProfileComponent (Jest)', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LocalHostService, useValue: mockLocalHostService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    mockLocalHostService.getSessionStorageItem.mockImplementation(
      (key: string) => {
        const session: { [key: string]: string } = {
          id: '1',
          username: 'Maria',
          email: 'maria@email.com',
          role: '1',
        };
        return session[key];
      }
    );

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve preencher o formulário com os dados do usuário logado', () => {
    expect(component.profileForm?.get('name')?.value).toBe('Maria');
    expect(component.profileForm?.get('email')?.value).toBe('maria@email.com');
    expect(component.profileForm?.get('role')?.value).toBe(1);
  });

  it('deve habilitar o formulário ao entrar em modo de edição', () => {
    component.onEdit();
    expect(component.isEditing).toBe(true);
    expect(component.profileForm?.enabled).toBe(true);
  });

  it('não deve salvar se o formulário for inválido', () => {
    component.onEdit();
    component.profileForm?.get('name')?.setValue('');
    component.onSave();
    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Preencha todos os campos corretamente.',
      'Erro'
    );
  });

  it('deve salvar com sucesso e atualizar dados do usuário', () => {
    component.onEdit();
    component.profileForm?.setValue({
      name: 'Maria Silva',
      email: 'maria.nova@email.com',
      role: 2,
    });

    mockUserService.updateUser.mockReturnValue(of({}));

    component.onSave();

    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Usuário atualizado com sucesso!',
      'Sucesso'
    );
    expect(mockLocalHostService.setSessionStorageItem).toHaveBeenCalledWith(
      'username',
      'Maria Silva'
    );
  });

  it('deve exibir erro ao falhar no update do usuário', () => {
    component.onEdit();
    component.profileForm?.setValue({
      name: 'Maria Silva',
      email: 'maria.nova@email.com',
      role: 2,
    });

    mockUserService.updateUser.mockReturnValue(
      throwError(() => new Error('Erro'))
    );

    component.onSave();

    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Erro ao atualizar usuário.',
      'Erro'
    );
  });

  it('deve navegar para a página de usuários', () => {
    component.navigateToUsers();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['users']);
  });
});
