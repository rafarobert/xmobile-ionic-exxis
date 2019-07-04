import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {DocumentoService} from "../modelos/documento.service";


@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
    public ventasArr: any;
    public btnCrear: number;
    public i: number;
    public documentEnvio: any;

    constructor(private navCrl: NavController,
                private menuCtrl: MenuController,
                private documentoService: DocumentoService) {
        this.menuCtrl.enable(true);
        this.btnCrear = 0;
        this.i = 0;
        this.documentEnvio = [];
    }


    ngOnInit() {
        this.ventasArr = [];
    }

    ionViewWillEnter() {
        this.ventasArr = [];
        this.documentoService.findAll().then((data: any) => {
            this.btnCrear = data.rows.length;
            for (let i = 0; i < data.rows.length; i++) {
                this.ventasArr.push(data.rows.item(i));
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    public pageSincronizar() {
        this.navCrl.navigateForward(`sincronizar`);
    }


    public detallePedidos() {
        this.navCrl.navigateForward(`detallepedido/0`);
    }

    public crearPedido() {
        this.navCrl.navigateForward(`detallepedido/null`);
    }

}
