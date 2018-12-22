import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionStatisctcsRoutingModule } from './subscription-statistcs-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionStatistcsComponent } from './subscription-statistcs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Angular2CsvModule } from 'angular2-csv';

@NgModule({
  imports: [
    CommonModule,
    SubscriptionStatisctcsRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    Angular2CsvModule
  ],
  declarations: [
    SubscriptionStatistcsComponent,
  ],
  entryComponents: [
  ]
})
export class SubscriptionStatistcsModule {

  
}
