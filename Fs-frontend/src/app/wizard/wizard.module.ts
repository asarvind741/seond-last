import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormWizardsComponent } from './wizard.component';
import {FormWizardsRoutingModule} from './wizard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { WizardCustomComponent } from './wizard-custom-first-login/wizard-custom.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormWizardsRoutingModule,
    SharedModule,
    ArchwizardModule
  ],
  declarations: [
    FormWizardsComponent,
    WizardCustomComponent,
  ]
})
export class WizardModule { }
