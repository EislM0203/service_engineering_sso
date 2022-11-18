import {Component} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {filter} from "rxjs";
import {authCodeFlowConfig} from "./auth.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private oauthService: OAuthService) {}

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
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
    this.oauthService.initLoginFlow()
  }
}
