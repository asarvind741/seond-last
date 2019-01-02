import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module'
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProductDetailsRoutingModule
    ],
    declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule { }
