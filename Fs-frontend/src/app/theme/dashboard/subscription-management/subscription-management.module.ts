import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionManagementRoutingModule } from './subscription-management-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionManagementComponent } from './subscription-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';
import { Angular2CsvModule } from 'angular2-csv';
@NgModule({
  imports: [
    CommonModule,
    SubscriptionManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    Angular2CsvModule
  ],
  declarations: [
    SubscriptionManagementComponent, 
    AddSubscriptionComponent, 
    EditSubscriptionComponent
  ],
  entryComponents: [
    AddSubscriptionComponent,
    EditSubscriptionComponent
  ]
})
export class SubscriptionManagementModule {

  
}
