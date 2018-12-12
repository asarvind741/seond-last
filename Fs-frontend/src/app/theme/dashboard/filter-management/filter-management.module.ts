import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterManagementRoutingModule } from './filter-management-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterManagementComponent } from './filter-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddFilterComponent } from './add-filter/add-filter.component';
import { EditFilterComponent } from './edit-filter/edit-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FilterManagementRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    FilterManagementComponent, 
    AddFilterComponent, 
    EditFilterComponent
  ],
  entryComponents: [
    AddFilterComponent,
    EditFilterComponent
  ]
})
export class FilterManagementModule {

  
}
