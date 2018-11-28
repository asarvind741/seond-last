import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-wizard-custom',
    templateUrl: './wizard-custom.component.html',
    styleUrls: ['./wizard-custom.component.scss']
})
export class WizardCustomComponent implements OnInit {

    constructor(private userService: UserService) { }

    userProfileForm: FormGroup;
    userId: any;

    ngOnInit() {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.createForm();

    }

    createForm() {
        let firstName = '';
        let lastName = '';
        let email = '';
        let mobile = '';
        let address = new FormArray([]);
        this.userService.getUser(this.userId)
            .subscribe(response => {
                let userData = response['data'];
                firstName = userData.firstName ? userData.firstName : '';
                lastName = userData.lastName ? userData.lastName : '';
                mobile = userData.mobile ? userData.mobile : '';
                email = userData.email ? userData.email : '';
                if (userData.address) {
                    const addressObj = userData.address;
                    address.push(
                        new FormGroup({
                            'line1': new FormControl(addressObj.line1),
                            'line2': new FormControl(addressObj.line2),
                            'city': new FormControl(addressObj.city),
                            'postalCode': new FormControl(addressObj.postalCode),
                            'country': new FormControl(addressObj.country)
                        })
                    )
                    this.userProfileForm = new FormGroup({
                        firstName: new FormControl(firstName),
                        lastName: new FormControl(lastName),
                        mobile: new FormControl(mobile),
                        email: new FormControl(email),
                        address: address,
                        confirmUserProfileDetails: new FormControl(null)
                    })
                }

            })
        this.userProfileForm = new FormGroup({
            firstName: new FormControl(firstName),
            lastName: new FormControl(lastName),
            mobile: new FormControl(mobile),
            email: new FormControl(email),
            address: address,
            confirmUserProfileDetails: new FormControl(null)
        })
    }

    openSuccessSwal() {
        swal({
            title: 'Successful!',
            text: 'Profile Updated Successfully!',
            type: 'success'
        }).catch(swal.noop);
    }

    openUnscuccessSwal() {
        swal({
            title: 'Cancelled!',
            text: 'Error Occured!',
            type: 'error'
        }).catch(swal.noop);
    }

    updateUserData() {
        console.log("user data", this.userProfileForm.value)
        this.userService.updateUser(this.userId, this.userProfileForm.value)
            .subscribe((response: HttpResponse<any>) => {
                if (response.status === 200) {
                    this.openSuccessSwal();
                }
            }, (error) => {
                this.openUnscuccessSwal();
            })

    }

}
