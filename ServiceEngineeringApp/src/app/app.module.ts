import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import {AppComponent} from "./app.component";
import { ProtectedComponent } from './protected/protected.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://self.se.jku.at',
        realm: 'general-auth',
        clientId: 'angular'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe:false
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
