import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyWishlistComponent } from './my-wishlist.component';

const routes: Routes = [
  {
    path: '', component: MyWishlistComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WishlistRoutingModule { }
