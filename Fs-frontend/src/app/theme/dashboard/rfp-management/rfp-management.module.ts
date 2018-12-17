import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RfpManagementRoutingModule } from './rfp-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RfpManagementComponent } from './rfp-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddRfpComponent } from './add-rfp/add-rfp.component';
import { EditRfpComponent } from './edit-rfp/edit-rfp.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    RfpManagementRoutingModule,
    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RfpManagementComponent, 
    AddRfpComponent, 
    EditRfpComponent
  ],
  entryComponents: [
    AddRfpComponent,
    EditRfpComponent 
  ]
})
export class RfpManagementModule {

  
}
