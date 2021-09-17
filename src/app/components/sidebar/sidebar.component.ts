import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { UserService } from '../../services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/sale', title: 'Venta',  icon:'fas fa-shopping-cart text-green-default', class: '' },
    { path: '/consult-product', title: 'Productos',  icon:'fas fa-list-ul text-dark', class: '' },
    { path: '/consult-client', title: 'Clientes',  icon:'fas fa-user-cog text-dark', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems!: any[];
  public isCollapsed = true;

  constructor(private _userService: UserService, public router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  signOut() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }
}
