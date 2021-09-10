import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService) {

  }
  canActivate(): Observable<boolean> {
    return this._userService.isLogged.pipe(
      map(
        (resp: any) => {
          return resp;
        })
    );
  }
  
}
