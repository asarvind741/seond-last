import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRegistrationComponent } from './custom-registration.component';
import {CustomRegistrationRoutingModule} from './custom-registration-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomRegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ CustomRegistrationComponent ]
})
export class CustomRegistrationModule { 
 
}
