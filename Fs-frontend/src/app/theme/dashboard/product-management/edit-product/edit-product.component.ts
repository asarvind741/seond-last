import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from '../../../../services/product.service';
import { ModuleService } from '../../../../services/module.service';
import { CategoryService } from '../../../../services/category.service';
import { VatManagementService } from '../../../../services/vat-management.service';
import { FileHolder } from 'angular2-image-upload';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  showMessage: any;
  afuConfig: any;
  categoryList: any;
  selectedFilterVal: any = [];
  allCategoryFilters: any = [];
  selectedCategoryFilterValues: any = [];
  selectedCategoryFilter: any;
  filterValue: any = [];
  allModules: any = [];
  allCountry: any = [];
  allCategories: any = [];
  selectedCategories: any = [];
  selectedRegions: any = [];
  selectedModules: any = [];
  selectedCategoryFilters: any = [];
  allFilterValues: any = [];
  settings1: any;
  settings2: any;
  settings3: any;
  settings4: any;
  images: any = [];
  urls: any = [];
  moduleList: any;
  countryList: any;
  uploadedImages: any = [];
  @Input('currentProduct') currentProduct: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private categoryService: CategoryService,
    private filterService: FilterService,
    private moduleService: ModuleService,
    private vatManagementService: VatManagementService
  ) { }

  ngOnInit() {

    this.categoryService.getCategoryList()
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          response['data'].forEach(cat => {
            let element = { 'id': cat._id, 'itemName': cat.name };
            this.allCategories.push(element);
          })

        }
      })

    this.moduleService.getModuleList()
      .subscribe((response: HttpResponse<any>) => {
        this.moduleList = response['data'];
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
      singleSelection: true,
      text: "Select Category",
      enableSearchFilter: true
    };


    this.settings3 = {
      singleSelection: false,
      text: "Select Country",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

    this.settings4 = {
      singleSelection: false,
      text: "Select Values",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };
    this.createForm();
  }

  createForm() {
    console.log("current product=======>", this.currentProduct);

    let description = this.currentProduct.description ? this.currentProduct.description : '';
    let modules = this.currentProduct.modules ? this.currentProduct.modules : '';
    let name = this.currentProduct.name ? this.currentProduct.name : '';
    let status = this.currentProduct.status ? this.currentProduct.status : '';
    let width = this.currentProduct.width ? this.currentProduct.width : '';
    let height = this.currentProduct.height ? this.currentProduct.height : '';
    let price = this.currentProduct.price ? parseInt(this.currentProduct.price) : '';
    let regions = this.currentProduct.regions ? this.currentProduct.regions : '';
    let category = this.currentProduct.category ? this.currentProduct.category : '';

    this.allCategoryFilters = [];
    this.filterService.getSelectedCategoryFilters(category.id)
      .subscribe((response: HttpResponse<any>) => {
        this.categoryList = response['data'];
        this.categoryList.forEach(category => {
          this.allCategoryFilters.push(category.name);
          category.value.forEach((val, i) => {
            let element = { 'id': i, 'itemName': val }
            this.allFilterValues.push(element);
          })

          this.selectedCategoryFilterValues = [];
          // split and trim  
          this.categoryList.forEach((category) => {
            if (category.name) {
              category.value.forEach((val, i) => {
                let element = { 'id': i, 'itemName': val };
                this.selectedCategoryFilterValues.push(element);
              })
            }
          })
        })
      })




    let filters = new FormArray([]);

    if (this.currentProduct.filters.length > 0) {
      this.currentProduct.filters.forEach(filter => {
        var val1 = filter.value.map((val, i) => {
          console.log("val", val);
          let element = { 'id': i, 'itemName': val };
          return element;
        })
        filters.push(new FormGroup({
          'name': new FormControl(filter.name),
          'value': new FormControl([val1])
        }))
        this.filterValue.push(val1);

        console.log("sssssssss", filters.value)
      })
    }


    if (category) {
      let element = { 'id': category.id, 'itemName': category.name };
      this.selectedCategories.push(element);
    }

    if (regions.length > 0) {
      this.selectedRegions = [];
      regions.forEach(region => {
        let element = { 'id': region.id, 'itemName': region.name };
        this.selectedRegions.push(element);
      })

    }

    if (modules.length > 0) {
      this.selectedModules = [];
      modules.forEach(mod => {
        let element = { 'id': mod.id, 'itemName': mod.name };
        this.selectedModules.push(element);
      })

    }


    let images = [];

    if (this.currentProduct.images.length > 0) {
      let images = [];
      this.currentProduct.images.forEach(image => {
        images.push(image);
      });
      this.images = images;
    }



    this.editProductForm = new FormGroup({
      'name': new FormControl(name),
      'category': new FormControl(category),
      'filters': filters,
      'modules': new FormControl(modules),
      'price': new FormControl(price),
      'description': new FormControl(description),
      'regions': new FormControl(regions),
      'status': new FormControl(status),
      'width': new FormControl(width),
      'height': new FormControl(height),
      'images': new FormControl(images)
    })
  }

  editProduct() {
    this.editProductForm.value.images = [];
    this.images.forEach((image) => {
      this.editProductForm.value.images.push(image);
    });


    this.editProductForm.value.category.forEach((cat) => {
      cat.name = cat.itemName;
      delete cat.itemName;
    })

    this.editProductForm.value.modules.forEach((mod) => {
      mod.name = mod.itemName;
      delete mod.itemName;
    })

    this.editProductForm.value.regions.forEach((reg) => {
      reg.name = reg.itemName;
      delete reg.itemName;
    })

    this.productService.updateProduct(this.currentProduct._id ,this.editProductForm.value)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
        else {
          this.showMessage = "Error occured"
          this.openUnscuccessSwal();
        }
      }, (error) => {
        this.closeModal();
        this.showMessage = error.error['message']
        this.openUnscuccessSwal();
      })

  }

  addImage() {
    const control = new FormControl(null);
    (<FormArray>this.editProductForm.get('images')).push(control);
  }

  addNewFilter() {
    let userSelectedFilterValues = [];
    this.filterValue.push(userSelectedFilterValues);
    const control = new FormGroup({
      'name': new FormControl(null),
      'value': new FormControl([]),
    });

    (<FormArray>this.editProductForm.get('filters')).push(control);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          this.urls.push(event.target['result']);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onChange(event) {
    this.selectedCategoryFilterValues = [];
    // split and trim
    let x = event.target.value.split(":").pop().trim(' ');
    this.selectedCategoryFilter = x;

    this.categoryList.forEach((category) => {
      if (category.name === x) {
        category.value.forEach((val, i) => {
          let element = { 'id': i, 'itemName': val };
          this.selectedCategoryFilterValues.push(element);
        })
      }
    })

  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Product updated successfully!',
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
    this.editProductForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.editProductForm.reset();
  }

  onItemSelect(item: any) {

  }
  onItemSelectCat(item: any) {
    this.allCategoryFilters = [];
    this.filterService.getSelectedCategoryFilters(item.id)
      .subscribe((response: HttpResponse<any>) => {
        this.categoryList = response['data'];
        this.categoryList.forEach(category => {
          this.allCategoryFilters.push(category.name);
          category.value.forEach((val, i) => {
            let element = { 'id': i, 'itemName': val }
            this.allFilterValues.push(element);
          })

        })
      })
  }

  OnItemDeSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  onDeSelectAll(items: any) {
    this.selectedFilterVal = []
  }


  onRemoved(file: FileHolder) {

  }

  onUploadStateChanged(state: boolean) {

  }

  onUploadFinished(file: FileHolder) {
    this.images.push(file.serverResponse.response['_body']);
  }

}
