import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MyWishlistComponent } from './my-wishlist.component';
import { MyWishlistDetailsComponent } from './my-wishlist-details/my-wishlist-details.component'

@NgModule({
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModule
  ],
  declarations: [MyWishlistComponent, MyWishlistDetailsComponent]
})
export class WishlistModule { }
