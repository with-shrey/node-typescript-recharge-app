import {Injectable} from '@angular/core';
import Token from '../../../../../common/model/Token';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  setToken(token: Token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('user', JSON.stringify(token.user));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/portal/login']);
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('user')).userName;
  }
}
