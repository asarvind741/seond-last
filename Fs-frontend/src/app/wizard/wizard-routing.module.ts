import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormWizardsComponent} from './wizard.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardsComponent,
    data: {
      title: 'Setup your profile',
      icon: 'icon-layers',
      caption: 'Please help us to know more about you. Enter the details',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormWizardsRoutingModule { }
