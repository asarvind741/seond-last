import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: ContactSupplierComponent
    }
]

import { ContactSupplierComponent } from './contact-supplier.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ContactSupplierRoutingModule { }
