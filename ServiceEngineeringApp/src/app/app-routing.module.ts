import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ContentComponent } from './content/content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
