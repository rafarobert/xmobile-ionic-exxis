import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, ActionSheetController, ModalController} from '@ionic/angular';
import {ModalclientePage} from '../modalcliente/modalcliente.page';
import {ModalproductosPage} from '../modalproductos/modalproductos.page';
import {AuthenticationService} from "../services/authentication.service";
import {DocumentoService} from "../modelos/documento.service";

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

    constructor(private activatedRoute: ActivatedRoute,
                public actionSheetController: ActionSheetController,
                private navCrl: NavController, private authenticationService: AuthenticationService,
                public modalController: ModalController, private modelDocument: DocumentoService) {
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

    async direcciones(data: any) {
        let arrdirec = [];
        for (let dirccion of data.data.BPAddresses) {
            arrdirec.push({
                text: dirccion.AddressName,
                icon: 'locate',
                handler: () => {
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
                }
            } else {
                this.document = {
                    CardCode: data.data.CardCode,
                    CardName: data.data.CardName,
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
                }
            }
            this.modelDocument.insert(this.document);
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
        if (this.tipo != 0) {
            this.presentModal();
        } else {
            alert("Detalle cliente");
        }
    }

    public selectDetalle(data: any) {
        console.log(data);
        let f = new Date();
        let producto = {
            ItemCode: data.data.ItemCode,
            Dscription: '',
            Quantity: 3, // cantidad
            Price: 0, // presio
            Currency: data.data.ItemCode,
            WhsCode: data.data.ItemCode,
            LineTotal: data.data.ItemCode,
            GrossBase: data.data.ItemCode,
            idDocumento: data.data.ItemCode,
            fechaAdd: f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()
        }
    }

    async agregarProductos() {
        let doc = this.document;
        const modal = await this.modalController.create({
            component: ModalproductosPage,
            componentProps: doc
        });
        modal.onDidDismiss().then((data) => {
            if (data != undefined) {
                this.selectDetalle(data);
            }
        });
        return await modal.present();
    }

    public detalleProducto() {

    }
}
