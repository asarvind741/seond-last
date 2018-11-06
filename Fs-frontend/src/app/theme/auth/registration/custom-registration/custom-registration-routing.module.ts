import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CustomRegistrationComponent } from './custom-registration.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  {
    path: '',
    component: CustomRegistrationComponent,
    data: {
      title: 'Custom Registration'
    },
  },
  { path: 'activate/:token', component: ActivateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRegistrationRoutingModule { }
