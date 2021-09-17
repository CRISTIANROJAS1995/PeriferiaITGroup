import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment"

import { JwtHelperService } from '@auth0/angular-jwt'
import { LoginModel } from '../models/user/login.model';
import { UserModel } from '../models/user/user.model';
import { ProductModel } from '../models/product/product.model';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) {
  }

  addTransaction(value: ProductModel): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${environment.baseUrl}/Process/AddTransaction`, value,  { headers: reqHeader });
  }

}
