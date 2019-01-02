import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { UserService } from '../../../services/user.servivce';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {

  myWishlists: Array<any> = [];
  currentUser: any;
  isWishlist: Boolean = false;
  isWishListAvailable: Boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() { 
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    this.userService.getUserWishList()
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        console.log("response", response);
        if(response['data'] && response['data'].wishlist){
          this.isWishlist = true;
          this.myWishlists = response['data'].wishlist.products;
          if(this.myWishlists.length > 0){
            this.isWishListAvailable = true
          }
          else {
            this.isWishListAvailable = false;
          }
        }
      }
    })
  }
  

}
