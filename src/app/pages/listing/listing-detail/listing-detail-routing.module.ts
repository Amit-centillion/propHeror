import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailComponent } from './listing-detail.component';


const routes: Routes = [
  {
    path: '',
    component: ListingDetailComponent,
    children: [
    
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: '**', redirectTo: 'details', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}

