import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { BuyerProfileComponent } from './buyer-profile-form/buyer-profile.component';
import { SupplierProfileComponent } from './supplier-profile-form/supplier-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    ProfileComponent,
    BuyerProfileComponent,
    SupplierProfileComponent
  ]
})
export class ProfileModule { }
