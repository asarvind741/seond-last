import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      status: false
    },
    children: [
      {
        path: 'default',
        loadChildren: './default/default.module#DefaultModule'
      },
      {
        path: 'ecommerce',
        loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
      },
      {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule'
      },
      {
        path: 'user-management',
        loadChildren: './user-management/user-management.module#UserManagementModule'
      },
      {
        path: 'coupon-management',
        loadChildren: './coupon-management/coupon-management.module#CouponManagementModule'
      },
      {
        path: 'subscription-management',
        loadChildren: './subscription-management/subscription-management.module#SubscriptionManagementModule'
      },
      {
        path: 'subscription-statistcs',
        loadChildren: './subscription-statistcs/subscription-statistcs.module#SubscriptionStatistcsModule'
      },
      {
        path: 'vat-management',
        loadChildren: './vat-management/vat-management.module#VatManagementModule'
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
        path: 'company-profile',
        loadChildren: './company-profile/company-profile.module#CompanyProfileModule'
      },
      {
        path: 'company-profile2',
        loadChildren: './company-profile2/company-profile2.module#CompanyProfile2Module'
      },
      {
        path: 'product-management',
        loadChildren: './product-management/product-management.module#ProductManagementModule'
      },
      {
        path: 'filter-management',
        loadChildren: './filter-management/filter-management.module#FilterManagementModule'
      },
      {
        path: 'category-management',
        loadChildren: './category-management/category-management.module#CategoryManagementModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
