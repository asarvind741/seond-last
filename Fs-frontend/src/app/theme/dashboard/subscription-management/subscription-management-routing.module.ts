import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubscriptionManagementComponent } from './subscription-management.component';

const routes: Routes = [{ path: '', component: SubscriptionManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionManagementRoutingModule {}
