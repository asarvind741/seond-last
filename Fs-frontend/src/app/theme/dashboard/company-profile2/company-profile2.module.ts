import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CompanyProfile2Component } from './company-profile2.component';
import {CompanyProfile2RoutingModule} from './company-profile2-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { AboutLeadComponent } from './about-lead/about-lead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyProfile2RoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [CompanyProfile2Component, AboutLeadComponent]
})
export class CompanyProfile2Module { }
