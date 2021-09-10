import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

//Libs
import Swal from 'sweetalert2'

//Services
import { UserService } from '../../services/user.service';

//Models
import { LoginModel } from 'src/app/models/user/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  frm!: FormGroup;
  fieldTextType!: boolean;

  //Models
  loginRequest = new LoginModel();

  constructor(private _userService: UserService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router) {
    this.frm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  sendData() {
    debugger;

    if (this.frm.invalid) {
      return Object.values(this.frm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }

        Swal.fire({
          title: 'Oops...',
          text: 'Faltan campos para completar.',
          icon: 'warning',
          confirmButtonColor: '#212529'
        })

      });
    }
    this.login();
  }

  login() {

    this.loading();
    let petition: Observable<any>;

    this.loginRequest = {
      UserName: this.frm.get('UserName')?.value,
      Password: this.frm.get('Password')?.value
    };

    petition = this._userService.login(this.loginRequest);
    petition.subscribe((resp: any) => {

      this.hiddenLoading();
      if (resp.Result) {
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          title: 'Oops...',
          text: resp.Message,
          icon: 'error',
          confirmButtonColor: '#212529'
        })
      }
    });
  }

  get UserNameNotValid() {
    return this.frm.get('UserName')?.invalid && this.frm.get('UserName')?.touched
  }

  get PasswordNotValid() {
    return this.frm.get('Password')?.invalid && this.frm.get('Password')?.touched
  }

}
