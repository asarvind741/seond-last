import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VatManagementComponent } from './vat-management.component';
import { SelectedCountryWizardComponent } from './selected-country-wizard/selected-country-wizard.component'

const routes: Routes = [
  { path: '', component: VatManagementComponent, children: [
    { path: ':id', component: SelectedCountryWizardComponent }
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatManagementRoutingModule {}
