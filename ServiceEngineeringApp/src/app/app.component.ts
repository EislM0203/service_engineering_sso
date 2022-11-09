import {Component} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {filter} from "rxjs";
import {authCodeFlowConfig} from "./auth.config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    //this.oauthService.initCodeFlow('localhost:4200');
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
  }

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    // @ts-ignore
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }

  ngOnInit() {

  }

  login() {

  }

  loginS() {

  }

  loginK() {

  }
}
