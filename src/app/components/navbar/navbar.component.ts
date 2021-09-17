import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

//Services
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public focus: any;
  public listTitles!: any[];
  public location: Location;

  objUserData: any;

  constructor(location: Location, private element: ElementRef, private _userService: UserService, public router: Router) {

    this.location = location;

    //Obtener información del usuario LocalStorage
    let retrievedObject = localStorage.getItem('userData') as string;
    this.objUserData = JSON.parse(retrievedObject);
    console.log(this.objUserData)
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Inicio';
  }

  signOut() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }


}
