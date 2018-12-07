import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FilterManagementComponent } from './filter-management.component';

const routes: Routes = [{ path: '', component: FilterManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterManagementRoutingModule {}
