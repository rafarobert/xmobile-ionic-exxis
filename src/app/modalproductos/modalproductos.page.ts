import {Component, OnInit} from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {DetalleventaPage} from "../detalleventa/detalleventa.page";
import {DetallesService} from "../modelos/detalles.service";
import {Toast} from "@ionic-native/toast/ngx";

@Component({
    selector: 'app-modalproductos',
    templateUrl: './modalproductos.page.html',
    styleUrls: ['./modalproductos.page.scss'],
})
export class ModalproductosPage implements OnInit {
    public items: any;
    public cantidad: number;
    public document: any;
    public productoItem: any;
    public addCard: boolean;
    public animateAdd: string;

    constructor(public navParams: NavParams, public modalController: ModalController,
                private nativeStorage: NativeStorage, private toast: Toast,
                private detallesService: DetallesService) {
        this.items = [];
        this.cantidad = 0;
        this.document = navParams.data;
        this.addCard = false;
        this.animateAdd = '';
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


    public registrarDetalle(datos: any) {
        let f = new Date();
        let productodata = {
            ItemCode: this.productoItem.ItemCode,
            Dscription: this.productoItem.ItemName,
            Quantity: datos.cantidad,
            Price: datos.presio,
            Currency: datos.currency,
            LineTotal: datos.total,
            WhsCode: datos.almacenId,
            GrossBase: 0,
            idDocumento: this.document.id,
            idDefault: this.document.idDefault,
            unidadID: datos.unidad,
            fechaAdd: f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()
        };
        this.detallesService.insert(productodata).then((resp: any) => {
            this.addCard = true;
            this.animateAdd = 'animated flip';
            this.toast.show(`Resgistrado correctamente.`, '5000', 'bottom').subscribe(toast => {
            });
        }).catch((err: any) => {
            this.toast.show(`Error al registrar.`, '5000', 'center').subscribe(toast => {
            });
        })
    }

    async detalleVenta(producto: any) {
        producto.documentos = this.document;
        const modalx = await this.modalController.create({
            component: DetalleventaPage,
            componentProps: producto
        });
        modalx.onDidDismiss().then((data: any) => {
            if (data.data != 1) {
                this.addCard = false;
                this.animateAdd = '';
                this.registrarDetalle(data.data);
            }
        });
        return await modalx.present();
    }

    public seleccionar(data: any) {
        this.productoItem = data;
        this.detalleVenta(data);
    }


}
