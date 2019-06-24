import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authservis: AuthenticationService) {

  }

  public canActivate() {
    return this.authservis.checkToken();
  }
}
