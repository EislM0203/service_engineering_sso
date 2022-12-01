import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Subscription } from 'rxjs';

//import { AuthService } from '../auth/auth.service';
import { People } from './people.model';

@Component({
  selector: 'app-root',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}
 /*
  isAuthenticated = false;
  private userSub: Subscription;
  people: People[] = [];

  userName = "";

  constructor(
    private authService: AuthService
  ) { }
*/
  public async ngOnInit() {
    /*
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("!user: " + !user);
      console.log("!!user: " + !!user);
      //this.userName = this.authService.getName();
      this.userName = this.authService.UserName;
    })

     */
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

/*
  onLogout(){
    this.authService.logout();
    console.log("Logout clicked");
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  loadProfile(){
    this.authService.accessToken;
  }
*/

}
