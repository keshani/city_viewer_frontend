import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityViewComponent } from './city-view.component';

const routes: Routes = [
  {
    path: '',
    component: CityViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityViewRoutingModule { }
