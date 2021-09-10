import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//Services
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }

  loading() {
    Swal.fire({
      title: 'Wait',
      text: 'Cargando información...',
      icon: 'info'
      //confirmButtonColor: '#212529',
    })
    Swal.showLoading();
  }

  hiddenLoading() {
    Swal.close();
    Swal.hideLoading();
  }

}
