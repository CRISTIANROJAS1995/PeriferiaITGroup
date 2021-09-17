import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { ProductComponent } from '../../pages/product/product.component';
import { SaleComponent } from '../../pages/sale/sale.component';
import { ConsultProductComponent } from '../../pages/product/consult-product/consult-product.component';
import { ConsultClientComponent } from '../../pages/client/consult-client/consult-client.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sale', component: SaleComponent },
    { path: 'client/:id', component: ClientComponent },
    { path: 'consult-client', component: ConsultClientComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'consult-product', component: ConsultProductComponent }
];
