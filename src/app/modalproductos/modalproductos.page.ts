import {Component, OnInit} from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {DetalleventaPage} from "../detalleventa/detalleventa.page";

@Component({
    selector: 'app-modalproductos',
    templateUrl: './modalproductos.page.html',
    styleUrls: ['./modalproductos.page.scss'],
})
export class ModalproductosPage implements OnInit {
    public items: any;
    public cantidad: number;
    public document: any;

    constructor(public navParams: NavParams, public modalController: ModalController,
                private nativeStorage: NativeStorage, private dialogs: Dialogs) {
        this.items = [];
        this.cantidad = 0;
        this.document = navParams.data;
        console.log(navParams.data);
    }

    ngOnInit() {

        this.nativeStorage.getItem('productos-db').then((data: any) => {
            this.items = data;
        }, error => {

        });

    }

    public cerrar() {
        this.modalController.dismiss();
    }

    public respuesta() {

    }

    async detalleVenta(producto: any) {
        producto.documentos = this.document;
        const modalx = await this.modalController.create({
            component: DetalleventaPage,
            componentProps: producto
        });
        modalx.onDidDismiss().then((data: any) => {
            if (data.data != 1) {
                console.log(data.data);
                this.cerrar();
            }
        });
        return await modalx.present();
    }

    public seleccionar(data: any) {
        this.detalleVenta(data);
    }


}
