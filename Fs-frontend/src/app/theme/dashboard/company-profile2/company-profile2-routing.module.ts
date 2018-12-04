import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyProfile2Component} from './company-profile2.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfile2Component,
    data: {
      title: 'Company Profile',
      icon: 'ti-company',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - company profile',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfile2RoutingModule { }
