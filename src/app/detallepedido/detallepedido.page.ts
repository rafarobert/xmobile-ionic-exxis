import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, ActionSheetController, ModalController} from '@ionic/angular';
import {ModalclientePage} from '../modalcliente/modalcliente.page';
import {ModalproductosPage} from '../modalproductos/modalproductos.page';
import {AuthenticationService} from "../services/authentication.service";
import {DocumentoService} from "../modelos/documento.service";
import {AlmacenService} from "../modelos/almacen.service";
import {Toast} from "@ionic-native/toast/ngx";
import {DetallesService} from "../modelos/detalles.service";

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
    public document: any;
    public documentData: any;
    public almacenesArr: any;
    public almacenName: string;
    public almacenId: string;
    public RowNum: string;
    public AddressName: string;
    public Street: string;
    public sumaTotal: number;

    constructor(private activatedRoute: ActivatedRoute, private almacenService: AlmacenService,
                public actionSheetController: ActionSheetController, private toast: Toast, private detallesService: DetallesService,
                private navCrl: NavController, private authenticationService: AuthenticationService,
                public modalController: ModalController, private modelDocument: DocumentoService) {
        this.productos = [];
        this.header = [];
        this.registrado = "";
        this.CardName = "";
        this.almacenesArr = [];
        this.almacenName = '';
        this.almacenId = '';
        this.RowNum = '';
        this.AddressName = ''
        this.Street = '';
        this.sumaTotal = 0;
    }

    ngOnInit() {
        this.tipo = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.tipo == 'null' || this.tipo == null) {
            this.getAlmacen();
        } else {
            console.log(this.tipo);
            this.getCliente();
        }
    }


    public getCliente() {
        let id = parseInt(this.tipo);
        this.modelDocument.find(id)
            .then((data: any) => {
                let dt = data.rows.item(0);
                console.log(dt);
                this.CardName = dt.CardName;
                this.Address = dt.Address;
                this.registrado = dt.fecharegistro;
                this.listaproductos(dt.id);
            }).catch((e: any) => {
            console.log(e);
        })
    }

    public listaproductos(id: any) {
        this.productos = [];
        this.detallesService.findWhere(id).then((resp: any) => {
            for (let i = 0; i < resp.rows.length; i++) {
                let y = resp.rows.item(i);
                this.productos.push(y);
                this.sumaTotal += (y.Price * y.Quantity);
            }
        }).catch((err: any) => {
        })
    }

    async almacenes() {
        const actionSheetx = await this.actionSheetController.create({
            header: 'SELECCIONAR ALMACEN',
            buttons: this.almacenesArr
        });
        await actionSheetx.present();
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
                this.almacenes();
            }).catch((err: any) => {
                this.toast.show(`La base de datos de almacens no existe. `, '3000', 'top').subscribe(toast => {
                });
            })
        }).catch((error) => {
            this.toast.show(`El vendedor no existe. `, '3000', 'top').subscribe(toast => {
            });
        });
    }


    ngOnDestroy() {
        console.log(this.header);
        console.log(this.productos);
    }

    async direcciones(data: any) {
        let arrdirec = [];
        for (let dirccion of data.data.BPAddresses) {
            arrdirec.push({
                text: dirccion.AddressName,
                icon: 'locate',
                handler: () => {
                    this.RowNum = dirccion.RowNum;
                    this.AddressName = dirccion.AddressName
                    this.Street = dirccion.Street;
                    data.rowNum = dirccion.RowNum;
                    this.createDocument(data, dirccion);
                }
            });
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Seleccionar direccion del cliente:',
            buttons: arrdirec
        });
        await actionSheet.present();
    }

    public createDocument(data: any, dirs = null) {
        this.authenticationService.getUser().then((user: any) => {
            if (dirs != null) {
                this.document = {
                    CardCode: data.data.CardCode,
                    CardName: data.data.CardName,
                    DocType: 'DOP',
                    PriceListNum: data.data.PriceListNum,
                    DocCur: data.data.Currency,
                    Address: data.data.Address,
                    Street: (dirs.Street == "undefined" || dirs.Street == null) ? 'Not.' : dirs.Street,
                    Block: dirs.Block,
                    ZipCode: dirs.ZipCode,
                    TaxDate: this.registrado,
                    DocDate: this.registrado,
                    DocDueDate: this.registrado,
                    DocTotal: 0,
                    Series: user.config[0].sreOfertaVenta,
                    estadosend: 1,
                    fecharegistro: this.registrado,
                    fechaupdate: this.registrado,
                    fechasend: this.registrado,
                    rowNum: data.rowNum
                }
            } else {
                this.document = {
                    CardCode: data.data.CardCode,
                    CardName: data.data.CardName,
                    DocType: 'DOP',
                    PriceListNum: data.data.PriceListNum,
                    DocCur: data.data.Currency,
                    Address: data.data.Address,
                    Street: (data.data.BPAddresses[0].Street == "undefined" || data.data.BPAddresses[0].Street == null) ? 'Not.' : data.data.BPAddresses[0].Street,
                    Block: data.data.BPAddresses[0].Block,
                    ZipCode: data.data.BPAddresses[0].ZipCode,
                    TaxDate: this.registrado,
                    DocDate: this.registrado,
                    DocDueDate: this.registrado,
                    DocTotal: 0,
                    Series: user.config[0].sreOfertaVenta,
                    estadosend: 1,
                    fecharegistro: this.registrado,
                    fechaupdate: this.registrado,
                    fechasend: this.registrado,
                    rowNum: data.rowNum
                }
            }
            this.modelDocument.insert(this.document).then((dx: any) => {
                this.documentData = dx;
            }).catch((err: any) => {
                console.log(err);
            });
        }).catch((err: any) => {
            console.log(err);
        })
    }

    public selectDocument(data: any) {
        if (data.data.BPAddresses.length > 1) {
            this.direcciones(data);
            return;
        } else {
            this.createDocument(data);
        }
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalclientePage
        });
        modal.onDidDismiss()
            .then((data: any) => {
                this.header = data['data'];
                this.CardName = data['data'].CardName;
                this.Address = data['data'].Address;
                let f = new Date();
                this.registrado = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
                this.selectDocument(data);
            });
        return await modal.present();
    }


    public actionCliente() {
        if (this.tipo == 'null') {
            this.presentModal();
        }
    }

    async agregarProductos() {
        this.document.id = this.documentData.id;
        this.document.idDefault = this.almacenId;
        let doc = this.document;
        const modal = await this.modalController.create({
            component: ModalproductosPage,
            componentProps: doc
        });
        modal.onDidDismiss().then((data: any) => {
            if (data != undefined) {
                console.log(data);
            }
        });
        return await modal.present();
    }
}
