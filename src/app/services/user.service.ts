import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment"

import { JwtHelperService } from '@auth0/angular-jwt'
import { LoginModel } from '../models/user/login.model';
import { UserModel } from '../models/user/user.model';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getStatistics() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/User/GetStatistics`, { headers: reqHeader });
  }

  getUsersRequestEmployed() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/User/GetUsersRequestEmployed`, { headers: reqHeader });
  }

  login(value: LoginModel): Observable<any> {
    return this.http.post(`${environment.baseUrl}/User/Login`, value)
      .pipe(
        map(
          (resp: any) => {
            if (resp.Data != null) {
              this.saveToken(resp.Data.Token);
              this.saveDataUser(resp.Data.User);
              this.loggedIn.next(true);
            }
            return resp;
          })
      )
  }

  register(value: UserModel): Observable<any> {
    return this.http.post(`${environment.baseUrl}/User/Register`, value)
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.loggedIn.next(false);
  }

  updatePassword(value: LoginModel) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${environment.baseUrl}/Token/UpdatePassword`, value, { headers: reqHeader })
      .pipe(
        map(
          (resp: any) => {
            if (resp.Data != null) {
              this.saveToken(resp.Data.Token);
              this.saveDataUser(resp.Data.User);
              this.loggedIn.next(true);
            }
            return resp;
          })
      )
  }

  activateUserRequestEmployed(value: UserModel[]) {

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    console.log(value)
    return this.http.post(`${environment.baseUrl}/User/ActivateUserRequestEmployed`, value, { headers: reqHeader })
  }

  getCountry() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/User/GetCountry`);
  }


  private saveToken(token: string): void {
    if (token != '') {
      localStorage.setItem('token', token);
    }
  }

  private saveDataUser(data: UserModel): void {
    if (data != null) {
      localStorage.setItem('userData', JSON.stringify(data));
    }
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token') as string;
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired ->', isExpired);

    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }

  }

}
