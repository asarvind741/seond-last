import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModuleManagementComponent } from './module-management.component';

const routes: Routes = [{ path: '', component: ModuleManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleManagementRoutingModule {}
