import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactSupplierComponent } from './contact-supplier.component';
import { ContactSupplierRoutingModule } from './contact-supplier.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ContactSupplierRoutingModule
    ],
    exports: [],
    declarations: [ContactSupplierComponent],
    providers: [],
})
export class ContactSupplierModule { }
