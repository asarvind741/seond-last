import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatureManagementRoutingModule } from './feature-management-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureManagementComponent } from './feature-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddFeatureComponent } from './add-feature-module/add-feature-module.component';
import { EditFeatureComponent } from './edit-feature-module/edit-feature-module.component';

@NgModule({
  imports: [
    CommonModule,
    FeatureManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    FeatureManagementComponent, 
    AddFeatureComponent, 
    EditFeatureComponent
  ],
  entryComponents: [
    EditFeatureComponent,
    AddFeatureComponent
  ]
})
export class FeatureManagementModule {

  
}
