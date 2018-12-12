import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryManagementComponent } from './category-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    AngularMultiSelectModule,
    NgbModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CategoryManagementComponent, 
    AddCategoryComponent, 
    EditCategoryComponent
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent
  ]
})
export class CategoryManagementModule {

  
}
