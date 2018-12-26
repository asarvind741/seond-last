import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Angular2CsvModule } from 'angular2-csv';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    Angular2CsvModule
  ],
  declarations: [
    UserManagementComponent, 
    AddUserComponent, 
    EditUserComponent
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent
  ]
})
export class UserManagementModule {

  
}
