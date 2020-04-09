import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Token from '../../../../../common/model/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(userName: string, password: string): Observable<any> {
    return this.http.post(
        this.baseUrl + '/V1/user/login',
        {userName, password}
        , this.httpOptions)
        .pipe(map(User => {
          return User;
        }));
  }

  getData(): Observable<any> {
    return this.http.get(this.baseUrl + '/V1/user');
  }

  verifyOtp(userName: string, otp: string): Observable<Token> {
    return this.http.post<Token>(
        this.baseUrl + '/V1/user/verifyOtp',
        {userName, otp},
        this.httpOptions)
        .pipe(map(user => {
          return user;
        }));
  }


}
