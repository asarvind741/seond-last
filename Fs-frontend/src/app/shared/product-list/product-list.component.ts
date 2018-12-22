import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

@Input('productList') productList: any;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _DomSanitizationService: DomSanitizer
    ) { }

    ngOnInit() { }

    openProductDetails(id) {
        this.router.navigate(['../../product-details', id], { relativeTo: this.activatedRoute });
    }
}