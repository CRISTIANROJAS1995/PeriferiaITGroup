import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

import { ProductModel } from '../../../models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.css'],
  providers: [LowerCasePipe, NgbModalConfig, NgbModal]
})
export class ConsultProductComponent implements OnInit {

  products$!: Observable<ProductModel[]>;
  products: ProductModel[] = [];
  productList: ProductModel[] = [];
  pipe$!: PipeTransform;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  filter = new FormControl('');

  constructor(pipe: LowerCasePipe, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder, private _productService: ProductService) {

    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
     this.getAllProducts();
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

  search(text: string, pipe: PipeTransform): ProductModel[] {
    return this.productList.filter(product => {
      const term = text.toLowerCase();
      return product.Name.toLowerCase().includes(term)
    });
  }

  refresh() {
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe$))
    );
  }

  getAllProducts() {

    this.loading();
    this._productService.getProducts().subscribe((resp: any) => {
      Swal.close();
      Swal.hideLoading();
      if (resp.Result) {
        if (resp.Data != null) {
          this.products = resp.Data;
          this.productList = resp.Data;
          this.collectionSize = this.products.length
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

  deleteClient(product: ProductModel) {
    Swal.fire({
      title: '??Est?? seguro?',
      text: `??Est?? seguro que desea borrar el producto ${product.Name}`,
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then(resp => {
      if (resp.value) {
        this._productService.deleteProduct(product.Id).subscribe((resp: any) => {
          if (resp.Result) {
            Swal.fire({
              title: 'Informaci??n',
              text: resp.Message,
              icon: 'success'
            })
            this.getAllProducts();
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
