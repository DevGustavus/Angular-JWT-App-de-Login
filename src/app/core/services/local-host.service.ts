import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalHostService {
  constructor(private router: Router) {}

  // Métodos para manipular o localStorage
  setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  // Métodos para manipular o sessionStorage
  setSessionStorageItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getSessionStorageItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeSessionStorageItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  // Método para obter a URL/rota atual
  getCurrentUrl(): string {
    return this.router.url;
  }
}
