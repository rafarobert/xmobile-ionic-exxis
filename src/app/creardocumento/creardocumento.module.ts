import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreardocumentoPage } from './creardocumento.page';

const routes: Routes = [
  {
    path: '',
    component: CreardocumentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreardocumentoPage]
})
export class CreardocumentoPageModule {}
