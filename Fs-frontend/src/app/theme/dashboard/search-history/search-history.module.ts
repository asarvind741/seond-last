import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from "ng2-file-upload";
import { SearchHistoryRoutingModule } from './search-history-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchHistoryComponent } from './search-history.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageUploadModule } from "angular2-image-upload";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    SearchHistoryRoutingModule,
    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    FileUploadModule,
    SharedModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SearchHistoryComponent, 

  ],

})
export class SearchHistoryModule {

  
}
