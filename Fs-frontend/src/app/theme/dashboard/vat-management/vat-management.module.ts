import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { VatManagementRoutingModule } from './vat-management-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VatManagementComponent } from './vat-management.component';
import { SelectedCountryWizardComponent } from './add-vat/selected-country-wizard/selected-country-wizard.component'
import { AddVatComponent } from './add-vat/add-vat.component';
import { EditVatComponent } from './edit-vat/edit-vat.component';

@NgModule({
  imports: [
    CommonModule,
    VatManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    ArchwizardModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    VatManagementComponent,
    AddVatComponent,
    EditVatComponent,
    SelectedCountryWizardComponent
  ],
  entryComponents: [
    EditVatComponent
  ]
})
export class VatManagementModule {

  
}
