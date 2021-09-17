import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment"
import { ProductModel } from '../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/Process/GetProducts`, { headers: reqHeader });
  }

  getProduct(idProduct: number) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/Process/GetProduct/${idProduct}`, { headers: reqHeader });
  }

  deleteProduct(idProduct: number) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${environment.baseUrl}/Process/DeleteProduct/${idProduct}`, { headers: reqHeader });
  }

  addOrUpdateProduct(value: ProductModel): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${environment.baseUrl}/Process/AddOrUpdateProduct`, value,  { headers: reqHeader });
  }


}
