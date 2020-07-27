import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  });

  signUp(name: string, email: string, password: string, cnfpassword: string) {
    return this.http.post('http://forum.mashuptest.com/api/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: cnfpassword,
    });
  }

  login(email: string, password: string) {
    const body = new HttpParams().set('email', email).set('password', password);
    return this.http
      .post<User>('http://forum.mashuptest.com/api/login', body.toString(), {
        headers: this.headers,
      })
      .pipe(
        tap((event) => {
          const loginResp = {
            token: event.token,
            user: {
              id: event.user.id,
              name: event.user.name,
              email: event.user.email,
              createdAt: event.user.createdAt,
              updatedAt: event.user.updatedAt,
            },
          };
          localStorage.setItem('user', JSON.stringify(loginResp));
          this.user.next(loginResp);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }

  autoLogin() {
    const userdet: User = JSON.parse(localStorage.getItem('user'));
    if (!userdet) {
      this.user.next(null);
      return;
    } else {
      this.user.next(userdet);
      return true;
    }
  }
}
