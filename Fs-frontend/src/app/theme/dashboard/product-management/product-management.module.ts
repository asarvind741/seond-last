import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { CommonModule } from '@angular/common';
import { ImageUploadModule } from "angular2-image-upload";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductManagementComponent } from './product-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { Angular2CsvModule } from 'angular2-csv';


@NgModule({
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    ImageUploadModule.forRoot(),
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    Angular2CsvModule
  ],
  declarations: [
    ProductManagementComponent, 
    AddProductComponent, 
    EditProductComponent
  ],
  entryComponents: [
    AddProductComponent,
    EditProductComponent
  ]
})
export class ProductManagementModule {

  
}
