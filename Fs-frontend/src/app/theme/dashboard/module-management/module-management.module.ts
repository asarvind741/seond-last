import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleManagementRoutingModule } from './module-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleManagementComponent } from './module-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddModuleComponent } from './add-module/add-module.component';
import { EditModuleComponent } from './edit-module/edit-module.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    ModuleManagementRoutingModule,
    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ModuleManagementComponent, 
    AddModuleComponent, 
    EditModuleComponent
  ],
  entryComponents: [
    AddModuleComponent,
    EditModuleComponent
  ]
})
export class ModuleManagementModule {

  
}
