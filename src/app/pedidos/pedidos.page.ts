import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {DocumentoService} from "../modelos/documento.service";
import {DetallesService} from "../modelos/detalles.service"

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
                private menuCtrl: MenuController, private detallesService: DetallesService,
                private documentoService: DocumentoService) {
        this.menuCtrl.enable(true);
        this.btnCrear = 0;
        this.i = 0;
        this.documentEnvio = [];
    }

    public header() {
        return new Promise((resolve, reject) => {
            this.documentoService.findAll().then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject(err);
            })
        })
    }

    async pedidosarr(x: number) {
        if (x == 1) {
            this.documentEnvio = [];
        }
        let h: any;
        h = await this.header();
        let header = h.rows.item(this.i);
        this.detallesService.findWhere(header.id).then((respx: any) => {
            let u = [];
            for (let i = 0; i < respx.rows.length; i++) {
                u.push(respx.rows.item(i));
            }
            if (this.i < (h.rows.length - 1)) {
                this.i++;
                let documentosarr = {
                    header: header,
                    detalles: u
                };
                this.documentEnvio.push(documentosarr);
                this.pedidosarr(0);
            } else {
                console.log(this.documentEnvio);
                console.log(JSON.stringify(this.documentEnvio));
            }
        }).catch((err: any) => {
            console.log(err);
        })
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
