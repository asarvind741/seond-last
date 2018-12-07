import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from '../../../../services/product.service';
import { ModuleService } from '../../../../services/module.service';
import { CategoryService } from '../../../../services/category.service';
import { VatManagementService } from '../../../../services/vat-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  newProductForm: FormGroup;
  showMessage: any;
  categoryList: any;
  allCategory: any = [];
  allModules: any = [];
  allCountry: any = [];
  selectedRegions: any = [];
  selectedModules: any = [];
  selectedCategories: any = [];
  settings1: any;
  settings2: any;
  settings3: any;
  urls: any = [];
  moduleList: any;
  countryList: any;
  uploadedImages: any = [];
  statuss: Array<String> = ['Active', 'Inactive'];
  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private categoryService: CategoryService,
    private moduleService: ModuleService,
    private vatManagementService: VatManagementService
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryList()
      .subscribe((response: HttpResponse<any>) => {
        this.categoryList = response['data'];
        console.log("category list", this.categoryList);
        this.categoryList.forEach(category => {
          let element = { 'id': category._id, 'itemName': category.name }
          this.allCategory.push(element)

        })
      })

    this.moduleService.getModuleList()
      .subscribe((response: HttpResponse<any>) => {
        this.moduleList = response['data'];
        console.log("module list", this.moduleList);
        this.moduleList.forEach(mod => {
          let element = { 'id': mod._id, 'itemName': mod.name }
          this.allModules.push(element)
        })
      });

    this.vatManagementService.getCountryList()
      .subscribe((response: HttpResponse<any>) => {
        this.countryList = response['data'];
        this.countryList.forEach(country => {
          let element = { 'id': country.id, 'itemName': country.name };
          this.allCountry.push(element)
        })
      });

    this.settings1 = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

    this.settings2 = {
      singleSelection: false,
      text: "Select Categories",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

    this.settings3 = {
      singleSelection: false,
      text: "Select Country",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };
    this.createForm();
  }

  createForm() {
    let images = new FormArray([]);
    this.newProductForm = new FormGroup({
      'name': new FormControl(null),
      'categories': new FormControl([]),
      'modules': new FormControl([]),
      'price': new FormControl(null),
      'description': new FormControl(null),
      'regions': new FormControl([]),
      'status': new FormControl(null),
      'width': new FormControl(null),
      'height': new FormControl(null),
      'size': new FormControl(null),
      'images': images
    })
  }

  addNewProduct() {
    console.log("product value====>", this.newProductForm.value)
    // this.productService.addProduct(this.newProductForm.value)
    //   .subscribe((response: HttpResponse<any>) => {
    //     if (response.status === 200) {
    //       this.closeModal();
    //       this.openSuccessSwal();
    //     }
    //   }, (error) => {
    //     this.closeModal();
    //     this.showMessage = error.error['message']
    //     this.openUnscuccessSwal();
    //   })

  }

  addImage() {
    const control = new FormControl(null);
    (<FormArray>this.newProductForm.get('images')).push(control);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                  console.log(event.target['result']);
                   this.urls.push(event.target['result']); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Product created successfully!',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: this.showMessage,
      type: 'error'
    }).catch(swal.noop);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  cancelNewUserAddition() {
    this.newProductForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newProductForm.reset();
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

}
