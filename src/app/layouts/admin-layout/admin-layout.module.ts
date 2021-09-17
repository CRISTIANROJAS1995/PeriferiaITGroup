import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ConsultProductComponent } from '../../pages/product/consult-product/consult-product.component';
import { ProductComponent } from '../../pages/product/product.component';
import { ConsultClientComponent } from '../../pages/client/consult-client/consult-client.component';
import { ClientComponent } from '../../pages/client/client.component';

import { NgbModule, NgbPaginationModule, NgbAlertModule  } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    DashboardComponent,
    ConsultProductComponent,
    ProductComponent,
    ConsultClientComponent,
    ClientComponent
  ]
})

export class AdminLayoutModule {}
