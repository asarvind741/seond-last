import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Registration',
      status: false
    },
    children: [
       {
         path: '',
         loadChildren: './custom-registration/custom-registration.module#CustomRegistrationModule'
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }



