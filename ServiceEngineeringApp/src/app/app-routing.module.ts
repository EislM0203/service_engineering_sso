import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakGuardService } from './keycloak-guard.service.';
import { ProtectedComponent } from "./protected/protected.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: 'protected', component: ProtectedComponent, canActivate: [KeycloakGuardService] },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [KeycloakGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule {}
