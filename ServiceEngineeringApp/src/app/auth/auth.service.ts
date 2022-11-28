import { Injectable } from '@angular/core';
import {OAuthService, OAuthErrorEvent} from "angular-oauth2-oidc";
import { BehaviorSubject } from 'rxjs';
import {filter} from "rxjs";
import {authCodeFlowConfig} from "./auth.config";

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user = new BehaviorSubject<User>(null);

  constructor(private oauthService: OAuthService) {

    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn((event as any).info);
      }
    });

  this.oauthService.configure(authCodeFlowConfig);
  this.oauthService.loadDiscoveryDocument();
   }


loginKeycloak(){
  this.oauthService.events
    .pipe(filter((e) => e.type === 'token_received'))
    .subscribe((_) => this.oauthService.loadUserProfile()
    .then((res)=>{
      console.log(res);
    }));
  this.oauthService.initLoginFlow();
}


get UserName():string{
  const claims = this.oauthService.getIdentityClaims();
  if (!claims) return null;
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

loadUserProfile(){
  this.oauthService.events
   .pipe(filter((e) => ["token_received"].includes(e.type)))
   .subscribe((e) => this.oauthService.loadUserProfile().then((res)=>{
    console.log(res);
  }));
  //this.oauthService.loadUserProfile().then((res)=>{
  //     console.log(res);
  //   });
}

getName() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['name'];
  }

logout(){
  console.log("Logout auth Service");
  this.oauthService.logOut();

};

}
