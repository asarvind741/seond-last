import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRegistrationComponent } from './custom-registration.component';
import { MessageComponent } from './message/message.component';
import {CustomRegistrationRoutingModule} from './custom-registration-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  imports: [
    CommonModule,
    CustomRegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ 
    CustomRegistrationComponent,
    MessageComponent,
    ActivateComponent
   ]
})
export class CustomRegistrationModule { 
 
}
