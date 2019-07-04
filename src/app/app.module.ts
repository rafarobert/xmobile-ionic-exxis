import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {Device} from '@ionic-native/device/ngx';
import {Toast} from '@ionic-native/toast/ngx';
import {Network} from '@ionic-native/network/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {ModalclientePageModule} from './modalcliente/modalcliente.module';
import {ModalproductosPageModule} from './modalproductos/modalproductos.module';
import {DetalleventaPageModule} from "./detalleventa/detalleventa.module"
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {ActionSheet} from '@ionic-native/action-sheet/ngx';
import {Insomnia} from '@ionic-native/insomnia/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ModalclientePageModule,
        ModalproductosPageModule,
        DetalleventaPageModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        AndroidPermissions,
        Uid,
        Device,
        Toast,
        Network,
        HTTP,
        SpinnerDialog,
        NativeStorage,
        Dialogs,
        ActionSheet,
        Insomnia,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor() {

    }
}
