import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RfpManagementComponent } from './rfp-management.component';

const routes: Routes = [{ path: '', component: RfpManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfpManagementRoutingModule {}