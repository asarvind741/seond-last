import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SocialLoginModule, 
  AuthServiceConfig, 
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'ng4-social-login';
import { CustomLoginComponent } from './custom-login.component';
import {CustomLoginRoutingModule} from './custom-login-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

const config = new AuthServiceConfig(
  [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('Client_id')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('Client_id')
    },
    {
      id: LinkedinLoginProvider.PROVIDER_ID,
      provider: new LinkedinLoginProvider('860nh37aizp47z')
    }
  ], false);

  export function providerConfig(){
    return config;
  }

@NgModule({
  imports: [
    CommonModule,
    CustomLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SocialLoginModule
  ],
  declarations: [
    CustomLoginComponent, 
    TwoFactorAuthenticationComponent],
  providers: [
    { provide: AuthServiceConfig, useFactory: providerConfig}
  ]
})
export class CustomLoginModule { }
