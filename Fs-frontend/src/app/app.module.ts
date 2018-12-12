import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as elasticsearch from 'elasticsearch';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { CommonHeadersInterceptor } from './shared/interceptors/http.interceptors';
import { TokenIterceptor } from './shared/interceptors/token.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListComponent } from './theme/product-list/product-list/product-list.component';
import { ProductDetailsComponent } from './theme/product-list/product-details/product-details.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    MenuItems,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: CommonHeadersInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass:TokenIterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
