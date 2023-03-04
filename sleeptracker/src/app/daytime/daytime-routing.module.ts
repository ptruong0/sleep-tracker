import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaytimePage } from './daytime.page';

const routes: Routes = [
  {
    path: '',
    component: DaytimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaytimePageRoutingModule {}
