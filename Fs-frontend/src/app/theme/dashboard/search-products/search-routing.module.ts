import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Search',
      status: false
    },
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
