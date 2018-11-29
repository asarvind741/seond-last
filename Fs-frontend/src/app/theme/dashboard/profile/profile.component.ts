import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.scss',
  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  role: String;
  currentUserId: any;
  permissions: any;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser'))._id
    this.userService.getUser(this.currentUserId)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.user = response['data'];
        this.permissions = this.user.permissions;
        console.log("this.perminss", this.permissions)
        if (this.permissions.isAdmin) {
          this.role = 'admin'
        }
        else if(this.permissions.isBuyer){
          this.role = 'buyer'
        }
        else if (this.permissions.isSubAdmin) {
          this.role = 'subadmin'
        }
        else if (this.permissions.isSupplier) {
          this.role = 'supplier'
        }
        else 
        {
          this.role = "buyer"
        }
        
      }
    })
    
  }

}
