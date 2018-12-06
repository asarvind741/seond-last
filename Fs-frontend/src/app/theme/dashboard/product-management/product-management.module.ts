import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductManagementComponent } from './product-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
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
