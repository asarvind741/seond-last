import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    ProductDetailsComponent
  ]
})
export class DashboardModule { }
