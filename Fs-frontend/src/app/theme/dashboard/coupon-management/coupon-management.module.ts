import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CouponManagementRoutingModule } from './coupon-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CouponManagementComponent } from './coupon-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';

@NgModule({
  imports: [
    CommonModule,
    CouponManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CouponManagementComponent, 
    AddCouponComponent, 
    EditCouponComponent
  ],
  entryComponents: [
    AddCouponComponent,
    EditCouponComponent
  ]
})
export class CouponManagementModule {

  
}
