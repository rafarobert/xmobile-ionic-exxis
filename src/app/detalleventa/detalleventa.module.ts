import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DetalleventaPage} from './detalleventa.page';

const routes: Routes = [
    {
        path: '',
        component: DetalleventaPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DetalleventaPage]
})
export class DetalleventaPageModule {
}
