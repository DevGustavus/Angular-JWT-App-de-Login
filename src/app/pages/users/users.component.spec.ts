import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../core/interceptors/loading.service';
import { ElementRef, signal, WritableSignal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let toastService: jest.Mocked<ToastrService>;
  let loadingSignal: WritableSignal<boolean>;

  beforeEach(async () => {
    const toastServiceMock: Partial<jest.Mocked<ToastrService>> = {
      error: jest.fn(),
    };

    loadingSignal = signal(false);

    const loadingServiceMock: Partial<LoadingService> = {
      loading: loadingSignal,
      show: jest.fn(),
      hide: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientModule],
      providers: [
        { provide: ToastrService, useValue: toastServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastrService) as jest.Mocked<ToastrService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal quando onUserRowClicked é chamado com user válido', fakeAsync(() => {
    const mockUser = { id: '1', name: 'Alice' };

    const dialogRef = {
      showModal: jest.fn(),
      close: jest.fn(),
    } as unknown as HTMLDialogElement;

    component.userModal = new ElementRef(dialogRef);

    component.onUserRowClicked(mockUser);
    tick(500);

    expect(component.userSelected).toEqual(mockUser);
    expect(dialogRef.showModal).toHaveBeenCalled();
  }));

  it('deve exibir toast de erro se o modal não estiver disponível', fakeAsync(() => {
    const mockUser = { id: '2', name: 'Bob' };
    component.userModal = null as any;

    component.onUserRowClicked(mockUser);
    tick(500);

    expect(toastService.error).toHaveBeenCalledWith('Modal is not available');
  }));

  it('deve fechar o modal ao chamar closeModal', () => {
    const dialogRef = {
      close: jest.fn(),
    } as unknown as HTMLDialogElement;

    component.userModal = new ElementRef(dialogRef);

    component.closeModal();

    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('deve retornar true para isLoading quando o signal for true', () => {
    loadingSignal.set(true);

    expect(component.isLoading()).toBe(true);
  });

  it('deve retornar false para isLoading quando o signal for false', () => {
    loadingSignal.set(false);

    expect(component.isLoading()).toBe(false);
  });
});
