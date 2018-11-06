import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationRoutingModule} from './registration-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class RegistrationModule { }
