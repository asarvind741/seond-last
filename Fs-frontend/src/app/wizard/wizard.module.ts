import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { ReactiveFormsModule  } from '@angular/forms';
import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WizardRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    WizardComponent
  ]
})
export class WizardModule { }
