import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { ProductComponent } from '../../pages/product/product.component';
import { SaleComponent } from '../../pages/sale/sale.component';
import { ConsultProductComponent } from '../../pages/product/consult-product/consult-product.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'client', component: ClientComponent },
    { path: 'product', component: ProductComponent },
    { path: 'sale', component: SaleComponent },
    { path: 'consult-product', component: ConsultProductComponent }
];
