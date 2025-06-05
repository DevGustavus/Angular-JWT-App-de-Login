import { TestBed } from '@angular/core/testing';
import { LocalHostService } from './local-host.service';
import { Router } from '@angular/router';

describe('LocalHostService', () => {
  let service: LocalHostService;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    routerMock = {
      url: '/test-url',
    };

    TestBed.configureTestingModule({
      providers: [LocalHostService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(LocalHostService);

    localStorage.clear();
    sessionStorage.clear();
  });

  describe('localStorage methods', () => {
    it('should set and get item in localStorage', () => {
      service.setLocalStorageItem('key1', 'value1');
      expect(localStorage.getItem('key1')).toBe('value1');
      expect(service.getLocalStorageItem('key1')).toBe('value1');
    });

    it('should remove item from localStorage', () => {
      localStorage.setItem('keyToRemove', 'toBeRemoved');
      service.removeLocalStorageItem('keyToRemove');
      expect(localStorage.getItem('keyToRemove')).toBeNull();
    });

    it('should clear localStorage', () => {
      localStorage.setItem('keyA', 'valueA');
      localStorage.setItem('keyB', 'valueB');
      service.clearLocalStorage();
      expect(localStorage.length).toBe(0);
    });
  });

  describe('sessionStorage methods', () => {
    it('should set and get item in sessionStorage', () => {
      service.setSessionStorageItem('sessionKey1', 'sessionValue1');
      expect(sessionStorage.getItem('sessionKey1')).toBe('sessionValue1');
      expect(service.getSessionStorageItem('sessionKey1')).toBe(
        'sessionValue1'
      );
    });

    it('should remove item from sessionStorage', () => {
      sessionStorage.setItem('sessionKeyToRemove', 'toRemove');
      service.removeSessionStorageItem('sessionKeyToRemove');
      expect(sessionStorage.getItem('sessionKeyToRemove')).toBeNull();
    });

    it('should clear sessionStorage', () => {
      sessionStorage.setItem('sKeyA', 'sValueA');
      sessionStorage.setItem('sKeyB', 'sValueB');
      service.clearSessionStorage();
      expect(sessionStorage.length).toBe(0);
    });
  });

  describe('getCurrentUrl method', () => {
    it('should return current router url', () => {
      expect(service.getCurrentUrl()).toBe('/test-url');
    });
  });
});
