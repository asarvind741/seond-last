import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RestfulManagementComponent } from './restful-management.component';

const routes: Routes = [{ path: '', component: RestfulManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestfulManagementRoutingModule {}
