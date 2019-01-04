import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContactSupplierComponent } from './contact-supplier/contact-supplier.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
  ContactSupplierComponent]
})
export class DashboardModule { }
