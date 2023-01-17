import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class KeycloakGuardService implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (!await this.keycloakService.isLoggedIn()) {
      await this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
