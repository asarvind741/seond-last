import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryManagementComponent } from './category-management.component';

const routes: Routes = [{ path: '', component: CategoryManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule {}
