import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CompanyProfileComponent } from './company-profile.component';
import {CompanyProfileRoutingModule} from './company-profile-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyProfileRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    CompanyProfileComponent
  ]
})
export class CompanyProfileModule { }
