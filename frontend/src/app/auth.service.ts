import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auth } from './auth';

const baseBackendURL = process.env.NG_APP_BACKEND_URL;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<Auth | null>;
  public currentUser: Observable<Auth | null>;

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUserSubject = new BehaviorSubject<Auth | null>(JSON.parse(userData));
    } else {
      this.currentUserSubject = new BehaviorSubject<Auth | null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Auth>(`${baseBackendURL}/api/login/`, { username, password })
      .pipe(map(auth => {
        localStorage.setItem('currentUser', JSON.stringify(auth));
        this.currentUserSubject.next(auth);
        return auth;
      }));
  }

  azureLogin(idToken: string) {
    return this.http.post<any>(`${baseBackendURL}/api/auth/azure-login/`, { idToken })
      .pipe(map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject.next(result);
        return result;
      }));
  }

  register(username: string, password: string, role: string) {
    return this.http.post<Auth>(`${baseBackendURL}/api/register/`, { username, password, role });
  }

  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  private addAuthHeader(headers: HttpHeaders): HttpHeaders {
    if (this.currentUserValue && this.currentUserValue.access) {
      headers = headers.append('Authorization', 'Bearer ' + this.currentUserValue.access);
    }
    return headers;
  }

  getUserProfile() {
    const headers = this.addAuthHeader(new HttpHeaders());
    return this.http.get<any>(`${baseBackendURL}/api/profile/`, { headers }).pipe(
      map((response) => {
        return {
          first_name: response.first_name,
          last_name: response.last_name,
          role: response.role,
          password: '', // The password field should not be pre-filled
        };
      })
    );
  }

  updateUserProfile(profileData: any) {
    const headers = this.addAuthHeader(new HttpHeaders());
    return this.http.patch<any>(`${baseBackendURL}/api/profile/`, profileData, { headers });
  }
}
