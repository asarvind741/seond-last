import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLoginComponent } from './custom-login.component';
import {CustomLoginRoutingModule} from './custom-login-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

@NgModule({
  imports: [
    CommonModule,
    CustomLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CustomLoginComponent, 
    TwoFactorAuthenticationComponent]
})
export class CustomLoginModule { }
