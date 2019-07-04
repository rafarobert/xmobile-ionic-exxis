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
                console.log(data.rows.item(i));
                this.ventasArr.push(data.rows.item(i));
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    public pageSincronizar() {
        this.navCrl.navigateForward(`sincronizar`);
    }

    public fixedEncodeURIComponent(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, '%2A').replace(/\*/g, "%2A");
    }

    public detallePedidos(item: any) {
        let itemid = item.id;
        this.navCrl.navigateForward(`detallepedido/` + itemid);
    }

    public crearPedido() {
        this.navCrl.navigateForward(`detallepedido/null`);
    }

}


/* console.log(item);
 let tesp = this.fixedEncodeURIComponent(JSON.stringify(item));
 console.log(tesp);
 //let tesp = encodeURIComponent(item);
 //console.log(tesp); */