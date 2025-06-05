import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../core/services/user.service';
import { LocalHostService } from '../../core/services/local-host.service';
import { of, throwError } from 'rxjs';
import { User } from '../../core/models/user.model';
import { HttpResponse } from '@angular/common/http';

const mockUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@test.com', role: '1' },
  { id: '2', name: 'Bob', email: 'bob@test.com', role: '2' },
];

describe('UserTableComponent (Jest)', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userService: jest.Mocked<UserService>;
  let localHostService: jest.Mocked<LocalHostService>;

  beforeEach(async () => {
    const userServiceMock: Partial<jest.Mocked<UserService>> = {
      getAllUsers: jest.fn(),
      deleteUserById: jest.fn(),
    };

    const localHostServiceMock: Partial<jest.Mocked<LocalHostService>> = {
      getSessionStorageItem: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserTableComponent, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: LocalHostService, useValue: localHostServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
    localHostService = TestBed.inject(
      LocalHostService
    ) as jest.Mocked<LocalHostService>;

    localHostService.getSessionStorageItem.mockImplementation((key: string) => {
      if (key === 'role') return '2';
      if (key === 'id') return '123';
      return null;
    });

    userService.getAllUsers.mockReturnValue(
      of(new HttpResponse<User[]>({ body: mockUsers }))
    );
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar usuários no ngOnInit em desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      configurable: true,
    });
    component.ngOnInit();
    expect(component.users.length).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
    expect(component.visibleUsers.length).toBe(0);
  });

  it('deve inicializar usuários visíveis no mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 500,
      configurable: true,
    });
    component.ngOnInit();
    expect(component.visibleUsers.length).toBe(2);
    expect(component.loadIndex).toBe(10);
  });

  it('deve emitir o evento rowClicked ao clicar na linha', () => {
    const emitSpy = jest.spyOn(component.rowClicked, 'emit');
    component.onRowClicked(mockUsers[0]);
    expect(emitSpy).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('deve carregar mais usuários quando loadMoreUsers é chamado', () => {
    component.users = Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 1),
      name: `User${i + 1}`,
      email: `user${i + 1}@test.com`,
      role: '1',
    }));

    component.visibleUsers = component.users.slice(0, 10);
    component.loadIndex = 10;

    component.loadMoreUsers();

    expect(component.visibleUsers.length).toBe(15);
    expect(component.loadIndex).toBe(20);
  });

  it('deve abrir o modal de confirmação se tiver permissão', () => {
    const user = { id: '3', name: 'Test', email: 'test@test.com', role: '1' };
    component.userRole = 2;

    component.confirmModal = {
      open: jest.fn(),
    } as any;

    component.showDeleteConfirm(user);

    expect(component.selectedUser).toEqual(user);
    expect(component.confirmModal.open).toHaveBeenCalled();
  });

  it('deve alertar se não tiver permissão para excluir', () => {
    global.alert = jest.fn();
    component.userRole = 1;

    component.showDeleteConfirm(mockUsers[1]);

    expect(global.alert).toHaveBeenCalledWith(
      'Você não tem permissão para excluir este usuário.'
    );
  });

  it('deve deletar usuário e atualizar listas ao confirmar', () => {
    const user = mockUsers[0];
    component.selectedUser = user;
    component.users = [...mockUsers];
    component.visibleUsers = [...mockUsers];
    component.executorId = '123';

    userService.deleteUserById.mockReturnValue(
      of(new HttpResponse<void>({ status: 200 }))
    );

    component.onConfirmDelete();

    expect(userService.deleteUserById).toHaveBeenCalledWith(user.id, '123');
    expect(component.users.length).toBe(1);
    expect(component.visibleUsers.length).toBe(1);
    expect(component.selectedUser).toBeUndefined();
  });

  it('deve lidar com erro ao deletar usuário', () => {
    const user = mockUsers[0];
    component.selectedUser = user;
    component.executorId = '123';

    const error = new Error('Erro de API');
    userService.deleteUserById.mockReturnValue(throwError(() => error));

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    component.onConfirmDelete();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao deletar usuário',
      error
    );
  });
});
