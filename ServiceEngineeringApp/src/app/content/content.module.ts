import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContentModule {}
