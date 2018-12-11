import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestfulManagementRoutingModule } from './restful-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestfulManagementComponent } from './restful-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditRestfulComponent } from './edit-restful/edit-restful.component';

@NgModule({
  imports: [
    CommonModule,
    RestfulManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RestfulManagementComponent, 
    EditRestfulComponent
  ],
  entryComponents: [
    EditRestfulComponent
  ]
})
export class RestfulManagementModule {

  
}
