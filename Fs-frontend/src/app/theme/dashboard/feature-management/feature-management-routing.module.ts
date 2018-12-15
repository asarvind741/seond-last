import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeatureManagementComponent } from './feature-management.component';

const routes: Routes = [{ path: '', component: FeatureManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureManagementRoutingModule {}
