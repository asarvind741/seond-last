import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubscriptionStatistcsComponent } from './subscription-statistcs.component';

const routes: Routes = [{ path: '', component: SubscriptionStatistcsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionStatisctcsRoutingModule {}
