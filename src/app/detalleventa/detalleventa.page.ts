import {Component, OnInit, Input} from '@angular/core';
import {NavParams, ModalController, ActionSheetController} from '@ionic/angular';
import {AlmacenService} from "../modelos/almacen.service";
import {AuthenticationService} from "../services/authentication.service";
import {PreciosService} from "../modelos/precios.service";
import {UnidadesService} from "../modelos/unidades.service";
import {Toast} from '@ionic-native/toast/ngx';
import * as _ from 'lodash';

@Component({
    selector: 'app-detalleventa',
    templateUrl: './detalleventa.page.html',
    styleUrls: ['./detalleventa.page.scss'],
})
export class DetalleventaPage implements OnInit {
    public almacenName: string;
    public almacenId: string;
    public cantidad: number;
    public presio: number;
    public descuento: number;
    public total: number;
    public unidad: number;
    public comprometido: number;
    public disponible: number;
    public datapro: any;
    public almacenesArr: any;
    public opcionesUnidades: any;

    constructor(public navParams: NavParams,
                private almacenService: AlmacenService,
                private toast: Toast,
                private unidadesService: UnidadesService,
                public modalController: ModalController,
                private authenticationService: AuthenticationService,
                public actionSheetController: ActionSheetController,
                private preciosService: PreciosService) {
        this.total = 0;
        this.cantidad = 1;
        this.presio = 0;
        this.descuento = 0;
        this.unidad = 0;
        this.datapro = [];
        this.datapro = navParams.data;
        this.opcionesUnidades = [];
        this.almacenesArr = [];
        this.almacenName = '';
        this.almacenId = '';
    }

    public getPrecioproducto() {
        return new Promise((resolve, reject) => {
            resolve(_.find(this.datapro.ItemPrices, {'PriceList': this.datapro.documentos.PriceListNum}));
        })
    }

    async selectUnidades() {
        const actionSheetx = await this.actionSheetController.create({
            header: 'Seleccionar unidad',
            buttons: this.opcionesUnidades
        });
        await actionSheetx.present();
    }

    public getrelax() {
        this.getPrecioproducto().then((resp: any) => {
            console.log("Productos precio");
            console.log(resp);
            if (resp.UoMPrices.length > 0) {
                for (let i of resp.UoMPrices) {
                    this.unidadesService.findOne(i.UoMEntry).then((data: any) => {
                        console.log("Datos Unidades");
                        console.log(data);
                        this.opcionesUnidades.push({
                            text: data.Name,
                            role: 'destructive',
                            handler: () => {
                                console.log(data.Name);
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }
            this.preciosService.findOne(resp.PriceList).then((data: any) => {
                console.log("Precio de unidades");
                console.log(data);
            }).catch((error: any) => {
                console.log(error)
            })
        }).catch((err: any) => {
            console.log(err);
        })
    }


    ngOnInit() {
        this.comprometido = this.datapro.QuantityOrderedFromVendors;
        this.disponible = this.datapro.QuantityOnStock;
        this.calTotal();
        this.getAlmacen();
        //this.getrelax();
    }


    public getAlmacen() {
        this.authenticationService.getUser().then((data: any) => {
            let codAlma = data.config[0].almacenes;
            this.almacenService.findAll().then((dataz: any) => {
                if (codAlma != '') {
                    let arr = codAlma.split(',');
                    for (let x of arr) {
                        for (let almacex of dataz) {
                            if (almacex.WarehouseCode == x) {
                                this.almacenesArr.push({
                                    text: almacex.WarehouseName,
                                    handler: () => {
                                        this.almacenName = almacex.WarehouseName;
                                        this.almacenId = almacex.WarehouseCode;
                                    }
                                })
                            }
                        }
                    }
                } else {
                    for (let almacex of dataz) {
                        this.almacenesArr.push({
                            text: almacex.WarehouseName,
                            handler: () => {
                                this.almacenName = almacex.WarehouseName;
                                this.almacenId = almacex.WarehouseCode;
                            }
                        })
                    }
                }
            }).catch((err: any) => {
                this.toast.show(`La base de datos de almacens no existe. `, '3000', 'top').subscribe(toast => {
                });
            })
        }).catch((error) => {
            this.toast.show(`El vendedor no existe. `, '3000', 'top').subscribe(toast => {
            });
        });
    }

    public cerrar(estadoCierre: any) {
        this.modalController.dismiss(estadoCierre);
    }

    public calTotal() {
        this.total = ((this.cantidad * this.presio) - this.descuento)
    }

    public agregar() {
        this.modalController.dismiss({
            almacenName: this.almacenName,
            almacenId: this.almacenId,
            cantidad: this.cantidad,
            presio: this.presio,
            descuento: this.descuento,
            total: this.total,
        });
    }

    async almacenes() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Seleccionar almacen',
            buttons: this.almacenesArr
        });
        await actionSheet.present();
    }

}
