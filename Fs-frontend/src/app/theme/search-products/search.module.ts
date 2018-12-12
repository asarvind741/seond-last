import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { SearchComponent } from './search.component';
import { ProductListComponent } from '../product-list/product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchComponent,
    ProductListComponent
  ]
})
export class SearchModule { }
