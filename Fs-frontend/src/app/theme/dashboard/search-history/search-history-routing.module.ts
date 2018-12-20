import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchHistoryComponent } from './search-history.component';

const routes: Routes = [{ path: '', component: SearchHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHistoryRoutingModule {}