import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ClientService } from '../../services/client.service';
import { ClientModel } from '../../models/client/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  frm: FormGroup;
  title: string = '';
  client = new ClientModel();
  clientSendModel = new ClientModel();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, public router: Router, private _clientService: ClientService) {
    this.frm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Identification: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      IdStatus: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.title = 'Actualización de Cliente';
      this._clientService.getClient(id).subscribe((resp: any) => {
        if (resp.Result) {
          this.client = resp.Data;
          this.preloadData(resp.Data);
        } else {
          Swal.fire({
            title: 'Oops...',
            text: resp.Message,
            icon: 'error'
          })
        }
      });
    } else {
      this.title = 'Creación de Cliente';
    }
  }

  saveData() {
    if (this.frm.invalid) {
      return Object.values(this.frm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }

        Swal.fire({
          title: 'Oops...',
          text: 'Faltan campos por diligenciar',
          icon: 'warning',
        })
      });
    }
    this.addOrUpdate();
  }

  preloadData(data: ClientModel) {
    this.frm.reset({
      FirstName: data.FirstName,
      LastName: data.LastName,
      Identification: data.Identification,
      PhoneNumber: data.PhoneNumber,
      IdStatus: data.IdStatus
    });
  }

  addOrUpdate() {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let petition: Observable<any>;
    let valueShowTypePetition: string = '';

    this.clientSendModel = {
      Id: this.client.Id > 0 ? this.client.Id : 0,
      IdStatus: this.frm.get('IdStatus')?.value,
      FirstName: this.frm.get('FirstName')?.value,
      LastName: this.frm.get('LastName')?.value,
      Identification: this.frm.get('Identification')?.value,
      PhoneNumber: this.frm.get('PhoneNumber')?.value,
      CreatedDate: new Date(),
      UpdateDate: new Date()
    }

    if (this.client.Id > 0) {
      valueShowTypePetition = 'actualizó';
    } else {
      valueShowTypePetition = 'creo';
    }

    petition = this._clientService.addOrUpdateClient(this.clientSendModel);
    petition.subscribe((resp: any) => {
      if (resp.Result) {
        Swal.fire({
          title: this.client.FirstName,
          text: `Se ${valueShowTypePetition} correctamente el Cliente`,
          icon: 'success'
        })
        this.router.navigate(['/consult-client']);
      } else {
        Swal.fire({
          title: 'Oops...',
          text: resp.Message,
          icon: 'error'
        })
      }

    });
  }

  get firstNameNotValid() {
    return this.frm.get('FirstName')?.invalid && this.frm.get('FirstName')?.touched
  }

  get lastNameNotValid() {
    return this.frm.get('LastName')?.invalid && this.frm.get('LastName')?.touched
  }

  get identificationNotValid() {
    return this.frm.get('Identification')?.invalid && this.frm.get('Identification')?.touched
  }

  get phoneNumberNotValid() {
    return this.frm.get('PhoneNumber')?.invalid && this.frm.get('PhoneNumber')?.touched
  }

  get idStatusNotValid() {
    return this.frm.get('IdStatus')?.invalid && this.frm.get('IdStatus')?.touched
  }

}
