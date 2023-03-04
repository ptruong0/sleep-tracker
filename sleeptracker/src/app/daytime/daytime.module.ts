import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaytimePageRoutingModule } from './daytime-routing.module';

import { DaytimePage } from './daytime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaytimePageRoutingModule
  ],
  declarations: [DaytimePage]
})
export class DaytimePageModule {}
