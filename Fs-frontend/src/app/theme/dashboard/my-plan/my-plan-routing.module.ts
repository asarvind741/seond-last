import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyPlanComponent } from './my-plan.component';

const routes: Routes = [
    { path: '', component: MyPlanComponent }
]

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [],
})
export class MyPlanRoutingModule {}