import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { VatManagementService } from '../../../../services/vat-management.service';

@Component({
    selector: 'app-add-vat-management',
    templateUrl: './add-vat.component.html',
    styleUrls: [
        './add-vat.component.scss',
        '../../../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class AddVatComponent implements OnInit {
    countries: Array<Object> = [];
    addClass: Boolean = false;
    selectedCountry: Object;
    vatData: any = [];
    constructor(
        private vatManagementService: VatManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.getCountries();
    }
    ngOnInit() {
        this.getVat();
    }

    getVat() {
        this.vatManagementService.getVat().subscribe((response: HttpResponse<any>) => {
            if (response.status === 200) {
                this.vatData = response['data'];
            }
        })
    }

    getCountries() {
        this.vatManagementService.getCountryList()
            .subscribe((response: HttpResponse<any>) => {
                if (response.status === 200) {
                    this.countries = response['data'];
                }
            })
    }

    selectCountry(country) {
        this.addClass = true;
        this.vatManagementService.selectedCountrySubject.next(country);
        // this.router.navigate([country.id], { relativeTo: this.activatedRoute});
    }





    openSuccessSwal() {
        swal({
            title: 'Successful!',
            text: 'Plan updated successfully!',
            type: 'success'
        }).catch(swal.noop);
    }

    openUnscuccessSwal() {
        swal({
            title: 'Cancelled!',
            text: 'Please try again',
            type: 'error'
        }).catch(swal.noop);

    }
}
