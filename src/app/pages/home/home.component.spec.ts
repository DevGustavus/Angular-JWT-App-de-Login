import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: { navigate: jest.Mock };

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate with /login on navigate()', () => {
    component.navigate();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
