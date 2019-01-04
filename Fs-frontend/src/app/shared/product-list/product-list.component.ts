import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.servivce';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

    @Input('productList') productList: any;
    @Input('productFilters') productFilters: any;
    showMessage: any;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private toastrService: ToastrService,
    ) { }

    ngOnInit() {
    }

    openProductDetails(product) {
        this.router.navigate(['../../product-details', product._id], { relativeTo: this.activatedRoute });
    }

    addToWishList(product) {
        this.userService.addToWishList(product._id)
            .subscribe((response: HttpResponse<any>) => {
                if (response.status === 200) {
                    this.showMessage = 'Product added to wishlist';
                    this.toastrService.success(this.showMessage, 'Successful',
                        { timeOut: 10000, positionClass: 'toast-top-center', closeButton: true, toastClass: 'toast' });
                }
            }, (error: HttpErrorResponse) => {
                this.toastrService.error('Unexpected Error occured', 'Error',
                { timeOut: 10000, positionClass: 'toast-top-center', closeButton: true, toastClass: 'toast' });
            })
    }

    contactSupplier(product){
        console.log("company", product.company.id);
        const queryParams = { supplierId: product.company.id }
        this.router.navigate(['/contact-supplier'], { queryParams: queryParams})
    }

}
