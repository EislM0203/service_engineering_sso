import {AuthConfig} from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://self.se.jku.at/realms/general-auth',
  clientId: 'angular',
  redirectUri: window.location.origin + '/index.html',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
}
