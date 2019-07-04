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
    public dataproductos: any;
    public almacenesArr: any;
    public opcionesUnidades: any;
    public currency: any;
    public unidadText: any;
    public productoName: any;
    public almacenIddefaul: any;

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
        this.currency = '';
        this.unidad = 0;
        this.dataproductos = [];
        this.dataproductos = navParams.data;
        this.opcionesUnidades = [];
        this.almacenesArr = [];
        this.almacenName = '';
        this.almacenId = '';
        this.almacenIddefaul = '';
        this.unidadText = '';
        this.productoName = 'Detalles.';

    }

    public getPrecioproducto() {
        return new Promise((resolve, reject) => {
            resolve(_.find(this.dataproductos.ItemPrices, {
                'PriceList': this.dataproductos.documentos.PriceListNum
            }));
        })
    }


    async getUnidad() {
        let precioDefault: any;
        let preciodefault2: any;
        let datadefault: any;
        precioDefault = await this.getPrecioproducto();
        precioDefault.unidad = this.dataproductos.InventoryUOM;
        preciodefault2 = await this.preciosService.findOne(precioDefault.PriceList);
        datadefault = Object.assign(precioDefault, preciodefault2);
        this.opcionesUnidades.push({
            text: datadefault.unidad,
            handler: () => {
                this.presio = datadefault.Price;
                this.currency = datadefault.Currency;
                this.unidadText = datadefault.unidad;
                this.calTotal();
            }
        });
        this.unidadText = datadefault.unidad;
        this.presio = datadefault.Price;
        this.currency = datadefault.Currency;
        if (datadefault.UoMPrices.length > 0) {
            for (let ix of datadefault.UoMPrices) {
                this.unidadesService.findOne(ix.UoMEntry).then((data: any) => {
                    this.opcionesUnidades.push({
                        text: data.Name,
                        handler: () => {
                            this.presio = ix.Price;
                            this.currency = ix.Currency;
                            this.unidadText = data.Name;
                            this.calTotal();
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    async selectUnidades() {
        const actionSheetx = await this.actionSheetController.create({
            header: 'SELECCIONAR UNIDADES:',
            buttons: this.opcionesUnidades
        });
        await actionSheetx.present();
    }

    ngOnInit() {
        console.log(this.dataproductos);
        console.log(this.dataproductos.documentos.idDefault);
        this.almacenIddefaul = this.dataproductos.documentos.idDefault;
        this.comprometido = this.dataproductos.QuantityOrderedFromVendors;
        this.disponible = this.dataproductos.QuantityOnStock;
        this.productoName = this.dataproductos.documentos.CardName;
        this.calTotal();
        this.getAlmacen();
        this.getUnidad();
    }


    public getAlmacen(n = 1) {
        this.authenticationService.getUser().then((data: any) => {
            let codAlma = data.config[0].almacenes;
            if (n == 1) {
                this.almacenService.findAll().then((dataz: any) => {
                    for (let almacex of dataz) {
                        if (almacex.WarehouseCode == this.almacenIddefaul) {
                            this.almacenName = almacex.WarehouseName;
                            this.almacenId = almacex.WarehouseCode;
                            this.almacenesArr.push({
                                text: almacex.WarehouseName,
                                handler: () => {
                                    this.almacenName = almacex.WarehouseName;
                                    this.almacenId = almacex.WarehouseCode;
                                }
                            })
                        }
                    }
                    this.getAlmacen(2);
                }).catch((err: any) => {
                    this.toast.show(`La base de datos de almacens no existe. `, '3000', 'top').subscribe(toast => {
                    });
                })
            } else {
                this.almacenService.findAll().then((dataz: any) => {
                    if (codAlma != '') {
                        let arr = codAlma.split(',');
                        for (let x of arr) {
                            for (let almacex of dataz) {
                                if (almacex.WarehouseCode == x && almacex.WarehouseCode != this.almacenIddefaul) {
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
                            if (almacex.WarehouseCode != this.almacenIddefaul) {
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
                }).catch((err: any) => {
                    this.toast.show(`La base de datos de almacens no existe. `, '3000', 'top').subscribe(toast => {
                    });
                })
            }
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
            unidad: this.unidadText,
            comprometido: this.comprometido,
            disponible: this.disponible,
            currency: this.currency,
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
