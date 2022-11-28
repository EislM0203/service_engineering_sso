import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { People } from './people.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;
  people: People[] = [];

  userName = "";

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("!user: " + !user);
      console.log("!!user: " + !!user);
      this.userName = this.authService.getName();
      //this.userName = this.authService.UserName;
    })
  }

  onLogout(){
    this.authService.logout();
    console.log("Logout clicked");
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  loadProfile(){
    this.authService.loadUserProfile();
  }

}
