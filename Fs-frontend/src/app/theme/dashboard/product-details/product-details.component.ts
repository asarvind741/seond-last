import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import {Location} from '@angular/common';

import { ProductService } from '../../../services/product.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
    productId: any;
    product: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private location: Location
        ) { }
    ngOnInit(): void {
        this.activatedRoute.params
        .subscribe((param: Params) => {
            this.productId = param['id'];
            this.productService.getProduct(this.productId)
            .subscribe((response: HttpResponse<any>) => {
                if(response.status === 200){
                    this.product = response['data'];
                }
            })
        })
     }

     navigateBack(){
         this.location.back();
     }
}