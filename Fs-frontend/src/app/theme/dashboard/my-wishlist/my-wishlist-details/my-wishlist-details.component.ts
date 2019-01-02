import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-wishlist-details',
  templateUrl: './my-wishlist-details.component.html',
  styleUrls: ['./my-wishlist-details.component.scss']
})
export class MyWishlistDetailsComponent implements OnInit {

  @Input('wishList') wishList: any;
  @Input('index') index: any;

  constructor( private router: Router) { }

  ngOnInit() {

  }

  openProductDetails(product){
    this.router.navigate(['/dashboard/product-details', product._id])
  }

}
