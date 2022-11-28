import {AuthConfig} from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://self.se.jku.at/realms/general-auth',
  clientId: 'angular',
  redirectUri: window.location.origin + '/content',
  responseType: 'code',
  scope: 'openid profile roles',
  showDebugInformation: true,
  postLogoutRedirectUri: window.location.origin + '/login',
  requestAccessToken: true
}
