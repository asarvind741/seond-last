import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VatManagementComponent } from './vat-management.component';
import { SelectedCountryWizardComponent } from './add-vat/selected-country-wizard/selected-country-wizard.component'
import { AddVatComponent } from './add-vat/add-vat.component';
import { EditVatComponent } from './edit-vat/edit-vat.component';

const routes: Routes = [
  { path: '', component: VatManagementComponent },
  {
    path: 'add', component: AddVatComponent,
    children: [
      { path: ':id', component: SelectedCountryWizardComponent }
    ]
  },
  {
    path: 'edit', component: EditVatComponent,
    children: [
      { path: ':id', component: SelectedCountryWizardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatManagementRoutingModule { }
