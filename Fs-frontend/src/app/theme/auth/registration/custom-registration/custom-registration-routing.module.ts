import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CustomRegistrationComponent } from './custom-registration.component';

const routes: Routes = [
  {
    path: '',
    component: CustomRegistrationComponent,
    data: {
      title: 'Custom Registration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRegistrationRoutingModule { }
