import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {ModalclientePage} from '../modalcliente/modalcliente.page';
import {ModalproductosPage} from '../modalproductos/modalproductos.page';

@Component({
    selector: 'app-detallepedido',
    templateUrl: './detallepedido.page.html',
    styleUrls: ['./detallepedido.page.scss'],
})
export class DetallepedidoPage implements OnInit {
    public tipo: any;
    public CardName: string;
    public Address: string;
    public productos: any;
    public header: any;
    public registrado: any;

    constructor(private activatedRoute: ActivatedRoute,
                private navCrl: NavController,
                public modalController: ModalController) {
        this.productos = [];
        this.header = [];
        this.registrado = "";
        this.CardName = "";
    }

    ngOnInit() {
        this.tipo = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.tipo);
    }

    ngOnDestroy() {
        console.log(this.header);
        console.log(this.productos);
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalclientePage
        });
        modal.onDidDismiss()
            .then((data) => {
                this.header = data['data'];
                this.CardName = data['data'].CardName;
                this.Address = data['data'].Address;
                let f = new Date();
                this.registrado = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
            });
        return await modal.present();
    }

    public actionCliente() {
        if (this.tipo != 0) {
            this.presentModal();
        } else {
            alert("Detalle cliente");
        }
    }

    async agregarProductos() {
        const modal = await this.modalController.create({
            component: ModalproductosPage
        });
        modal.onDidDismiss()
            .then((data) => {
                if (data != undefined) {
                    this.productos.push(data['data']);
                }
            });
        return await modal.present();
    }

    public detalleProducto() {

    }
}
