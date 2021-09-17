import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product/product.model';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  frm: FormGroup;
  title: string = '';
  product = new ProductModel();
  productSendModel = new ProductModel();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, public router: Router, private _productService: ProductService) {
    this.frm = this.fb.group({
      Name: ['', [Validators.required]],
      UnitValue: [0, [Validators.required, Validators.min(0)]],
      IdStatus: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.title = 'Actualización de Producto';
      this._productService.getProduct(id).subscribe((resp: any) => {
        if (resp.Result) {
          this.product = resp.Data;
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
      this.title = 'Creación de Producto';
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

  preloadData(data: ProductModel) {
    this.frm.reset({
      Name: data.Name,
      UnitValue: data.UnitValue,
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

    this.productSendModel = {
      Id: this.product.Id > 0 ? this.product.Id : 0,
      IdStatus: this.frm.get('IdStatus')?.value,
      Name: this.frm.get('Name')?.value,
      UnitValue: this.frm.get('UnitValue')?.value,
      CreatedDate: new Date(),
      UpdateDate: new Date()
    }

    if (this.product.Id > 0) {
      valueShowTypePetition = 'actualizó';
    } else {
      valueShowTypePetition = 'creo';
    }

    petition = this._productService.addOrUpdateProduct(this.productSendModel);
    petition.subscribe((resp: any) => {
      if (resp.Result) {
        Swal.fire({
          title: this.product.Name,
          text: `Se ${valueShowTypePetition} correctamente el producto`,
          icon: 'success'
        })
        this.router.navigate(['/consult-product']);
      } else {
        Swal.fire({
          title: 'Oops...',
          text: resp.Message,
          icon: 'error'
        })
      }

    });
  }

  get nameNotValid() {
    return this.frm.get('Name')?.invalid && this.frm.get('Name')?.touched
  }

  get unitValueNotValid() {
    return this.frm.get('UnitValue')?.invalid && this.frm.get('UnitValue')?.touched
  }

  get idStatusNotValid() {
    return this.frm.get('IdStatus')?.invalid && this.frm.get('IdStatus')?.touched
  }

}
