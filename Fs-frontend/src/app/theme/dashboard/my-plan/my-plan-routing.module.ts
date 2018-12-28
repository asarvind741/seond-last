import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPlanComponent } from './my-plan.component';
import { ChangeSubscriptionPlanComponent } from './change-subscription-plan/change-subscription-plan.component';

const routes: Routes = [
    {
        path: '', component: MyPlanComponent,
    },
    { 
        path: 'change', component: ChangeSubscriptionPlanComponent 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyPlanRoutingModule { }