import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPlanComponent } from './my-plan.component';
import { MyPlanRoutingModule } from './my-plan-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ChangeSubscriptionPlanComponent } from './change-subscription-plan/change-subscription-plan.component';
import { BuyerPlansComponent } from './change-subscription-plan/buyer-plans/buyer-plans.component';
import { SupplierPlansComponent } from './change-subscription-plan/supplier-plans/supplier-plans.component';

@NgModule({
    declarations: [
        MyPlanComponent,
        ChangeSubscriptionPlanComponent,
        BuyerPlansComponent,
        SupplierPlansComponent
    ],
    imports: [ 
        CommonModule,
        SharedModule,
        MyPlanRoutingModule
     ],
    exports: [],
    providers: [],
})
export class MyPlanModule {}