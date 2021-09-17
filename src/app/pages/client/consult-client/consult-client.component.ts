import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

import { ClientService } from 'src/app/services/client.service';
import { ClientModel } from '../../../models/client/client.model';

@Component({
  selector: 'app-consult-client',
  templateUrl: './consult-client.component.html',
  styleUrls: ['./consult-client.component.css'],
  providers: [LowerCasePipe, NgbModalConfig, NgbModal]
})
export class ConsultClientComponent implements OnInit {

  clients$!: Observable<ClientModel[]>;
  clients: ClientModel[] = [];
  clientList: ClientModel[] = [];
  pipe$!: PipeTransform;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  filter = new FormControl('');

  constructor(pipe: LowerCasePipe, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder, private _clientService: ClientService) {

    this.clients$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  loading() {
    Swal.fire({
      title: 'Espere',
      text: 'Cargando...',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();
  }

  search(text: string, pipe: PipeTransform): ClientModel[] {
    return this.clientList.filter(client => {
      const term = text.toLowerCase();
      return client.FirstName.toLowerCase().includes(term) ||
             client.LastName.toLowerCase().includes(term) ||
             client.Identification.toLowerCase().includes(term) ||
             client.PhoneNumber.toLowerCase().includes(term)
    });
  }

  refresh() {
    this.clients$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe$))
    );
  }

  getAllClients() {

    this.loading();
    this._clientService.getClients().subscribe((resp: any) => {
      Swal.close();
      Swal.hideLoading();
      if (resp.Result) {
        if (resp.Data != null) {
          this.clients = resp.Data;
          this.clientList = resp.Data;
          this.collectionSize = this.clients.length
          this.refresh();
        }
      } else {
        Swal.fire({
          title: 'Oops...',
          text: resp.Message,
          icon: 'error'
        })
      }
    });
  }

  deleteClient(client: ClientModel) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar el cliente ${client.FirstName}`,
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then(resp => {
      if (resp.value) {
        this._clientService.deleteClient(client.Id).subscribe((resp: any) => {
          if (resp.Result) {
            Swal.fire({
              title: 'Información',
              text: resp.Message,
              icon: 'success'
            })
            this.getAllClients();
          } else {
            Swal.fire({
              title: 'Oops...',
              text: resp.Message,
              icon: 'error'
            })
          }
        });
      }
    });
  }

}
