import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomLoginComponent} from './custom-login.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

const routes: Routes = [
  {
    path: '',
    component: CustomLoginComponent,
    data: {
      title: 'Simple Login'
    }
  },
  { path: 'one-time-password', component: TwoFactorAuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomLoginRoutingModule { }
