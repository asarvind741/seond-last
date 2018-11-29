import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyProfileComponent } from './company-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfileComponent,
    data: {
      title: 'Company Profile',
      icon: 'ti-company',
      caption: 'My Company Details',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
