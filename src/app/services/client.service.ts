import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment"
import { ClientModel } from '../models/client/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  getClients() {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/Process/GetClients`, { headers: reqHeader });
  }

  getClient(idClient: any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/Process/GetClient/${idClient}`, { headers: reqHeader });
  }

  deleteClient(idClient: number) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${environment.baseUrl}/Process/DeleteClient/${idClient}`, { headers: reqHeader });
  }

  addOrUpdateClient(value: ClientModel): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${environment.baseUrl}/Process/AddOrUpdateClient`, value,  { headers: reqHeader });
  }


}
