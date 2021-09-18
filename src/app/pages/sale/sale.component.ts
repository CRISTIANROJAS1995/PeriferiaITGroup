import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

import { ProductModel } from '../../models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

import { ClientModel } from '../../models/client/client.model';
import { ClientService } from 'src/app/services/client.service';
import { ProcessService } from 'src/app/services/process.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MultiSelectModel } from '../../models/generic/multi-select.model';
import { ProductSaleModel } from '../../models/sale/product-sale.model';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  frmSearch: FormGroup;

  productSelectSale: ProductSaleModel[] = [];
  objProductSale: ProductSaleModel = new ProductSaleModel();

  productsSale: ProductModel[] = [];
  client!: ClientModel;
  isShowForms: boolean = false;

  dropdownList: ProductModel[] = [];
  selectedItems: ProductSaleModel[] = [];
  dropdownSettings!: IDropdownSettings;

  constructor(private router: Router, config: NgbModalConfig, private fb: FormBuilder, private _productService: ProductService, private _clientService: ClientService, private _processService: ProcessService) {
    this.frmSearch = this.fb.group({
      Identification: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllProducts();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 5,
      searchPlaceholderText: 'Buscar',
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.validContentSale();
  }

  onDeSelect(item: any) {
    this.validContentSale();
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
    this.validContentSale();
  }

  validContentSale() {

    this.productSelectSale = [];

    if (this.selectedItems.length > 0) {
      for (let i = 0; i < this.selectedItems.length; i++) {

        var product = this.dropdownList.find(e => e.Id == this.selectedItems[i].Id);

        if (product != undefined) {
          this.objProductSale = new ProductSaleModel();
          this.objProductSale.Id = product.Id;
          this.objProductSale.IdStatus = product.IdStatus;
          this.objProductSale.Name = product.Name;
          this.objProductSale.UnitValue = product.UnitValue;
          this.objProductSale.Amount = 1;
          this.objProductSale.TotalValue = 0;
          this.objProductSale.Identification = this.frmSearch.get('Identification')?.value;
          this.productSelectSale.push(this.objProductSale);
        }
      }
    }
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

  getAllProducts() {
    this.loading();
    this._productService.getProducts().subscribe((resp: any) => {
      Swal.close();
      Swal.hideLoading();
      if (resp.Result) {
        if (resp.Data != null) {
          for (let i = 0; i < resp.Data.length; i++) {
            this.dropdownList = this.dropdownList.concat({
              Id: resp.Data[i].Id,
              Name: resp.Data[i].Name,
              IdStatus: resp.Data[i].IdStatus,
              UnitValue: resp.Data[i].UnitValue,
              CreatedDate: resp.Data[i].CreatedDate,
              UpdateDate: resp.Data[i].UpdateDate
            })
          }
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

  getClient(identification: any) {
    this.loading();
    this._clientService.getClientByIdentification(identification).subscribe((resp: any) => {
      Swal.close();
      Swal.hideLoading();
      if (resp.Result) {
        if (resp.Data != null) {
          this.isShowForms = true;
          this.client = resp.Data;
        }
      } else {
        this.isShowForms = false;
        Swal.fire({
          title: 'Oops...',
          text: 'La identificación ingresada, no corresponde a un cliente existente.',
          icon: 'error'
        })
      }
    });
  }

  searchClient() {
    if (this.frmSearch.invalid) {
      return Object.values(this.frmSearch.controls).forEach(control => {
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
    this.getClient(this.frmSearch.get('Identification')?.value);
  }

  totalValue(product: ProductSaleModel) {
    let totalValue: number = 0;
    totalValue = (product.UnitValue * product.Amount);
    product.TotalValue = totalValue;
    return totalValue;
  }

  globalTotalValue() {
    let totalValue: number = 0;
    for (let i = 0; i < this.productSelectSale.length; i++) {
      totalValue += this.productSelectSale[i].TotalValue;
    }
    return totalValue;
  }

  sendData() {

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let petition: Observable<any>;

    petition = this._processService.addTransaction(this.productSelectSale);
    petition.subscribe((resp: any) => {
      if (resp.Result) {
        Swal.fire({
          title: 'Venta',
          text: `Se creo correctamente la venta de los productos.`,
          icon: 'success'
        })
       // this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          title: 'Oops...',
          text: resp.Message,
          icon: 'error'
        })
      }

    });
  }

  get identificationNotValid() {
    return this.frmSearch.get('Identification')?.invalid && this.frmSearch.get('Identification')?.touched
  }

}
