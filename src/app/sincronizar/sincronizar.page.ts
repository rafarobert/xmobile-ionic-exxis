import {Component, OnInit} from '@angular/core';
import {DatarestService} from '../services/datarest.service';
import {Uid} from '@ionic-native/uid/ngx';
import {NavController} from '@ionic/angular';
import {Toast} from '@ionic-native/toast/ngx';
import {LocalidadService} from "../modelos/localidad.service";
import {AuthenticationService} from "../services/authentication.service";
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import {DetallesService} from "../modelos/detalles.service";
import {DocumentoService} from "../modelos/documento.service";
import {Insomnia} from '@ionic-native/insomnia/ngx';

@Component({
    selector: 'app-sincronizar',
    templateUrl: './sincronizar.page.html',
    styleUrls: ['./sincronizar.page.scss'],
})
export class SincronizarPage implements OnInit {
    public clientes: boolean;
    public productos: boolean;
    public usuarios: boolean;
    public almacenes: boolean;
    public listprecios: boolean;
    public listunidades: boolean;
    public todos: boolean;
    public estadoproductos: boolean;
    public estados: any;
    public aux: any;
    public contador: number;
    public loadproductos: boolean;
    public loadclientes: boolean;
    public loadusuarios: boolean;
    public loadalmacenes: boolean;
    public loadlistprecios: boolean;
    public loadlistunidades: boolean;
    public isenabled: boolean;
    public etiquetas: any;
    public i: number;
    public documentEnvio: any;
    public documentEnvioxxxx: any;
    public totalenvio: number;
    public load: boolean;

    constructor(private insomnia: Insomnia, private data: DatarestService, private uid: Uid, private documentoService: DocumentoService,
                private toast: Toast, private navCrl: NavController, private detallesService: DetallesService, private spinnerDialog: SpinnerDialog,
                public  localidadService: LocalidadService, private authenticationService: AuthenticationService) {
        this.estados = [];
        this.load = false;
        this.aux = [];
        this.todos = false;
        this.clientes = false;
        this.productos = false;
        this.usuarios = false;
        this.almacenes = false;
        this.listprecios = false;
        this.listunidades = false;
        this.estadoproductos = false;
        this.contador = 0;
        this.loadproductos = false;
        this.loadclientes = false;
        this.loadusuarios = false;
        this.loadalmacenes = false;
        this.loadlistprecios = false;
        this.loadlistunidades = false;
        this.isenabled = true;
        this.etiquetas = [];
        this.i = 0;
        this.totalenvio = 0;
        this.documentEnvio = [];
        this.documentEnvioxxxx = [];
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
    }

    ngOnInit() {
        this.ngLabels();
    }

    public despierto() {
        this.insomnia.keepAwake().then(() => {
        }, () => {
        });
    }

    public dormir() {
        this.insomnia.allowSleepAgain().then(() => {
        }, () => {
        });
    }

    public datatoggel() {
        this.estados = [
            {name: "productos", estado: this.productos},
            {name: "clientes", estado: this.clientes},
            {name: "usuarios", estado: this.usuarios},
            {name: "almacenes", estado: this.almacenes},
            {name: "listprecios", estado: this.listprecios},
            {name: "listunidades", estado: this.listunidades},
        ];
    }

    public datachanged(data) {
        if (this.todos == true) {
            this.clientes = true;
            this.productos = true;
            this.usuarios = true;
            this.almacenes = true;
            this.listprecios = true;
            this.listunidades = true;
        } else {
            this.clientes = false;
            this.productos = false;
            this.usuarios = false;
            this.almacenes = false;
            this.listprecios = false;
            this.listunidades = false;
        }

        this.estados = [
            {name: "productos", estado: this.productos},
            {name: "clientes", estado: this.clientes},
            {name: "usuarios", estado: this.usuarios},
            {name: "almacenes", estado: this.almacenes},
            {name: "listprecios", estado: this.listprecios},
            {name: "listunidades", estado: this.listunidades},
        ];
    }

    public getImei(): string {
        return this.uid.IMEI;
    }

    private asingProductos() {
        this.loadproductos = true;
        this.data.productos().then(data => {
            console.log(data);
            this.contador++;
            this.iniasing();
            this.loadproductos = false;
        }).catch((err) => {
            console.log(err);
            this.loadproductos = false;
        })
    }

    private asingClientes() {
        this.loadclientes = true;
        this.data.clientes().then(data => {
            console.log(data);
            this.contador++;
            this.iniasing();
            this.loadclientes = false;
        }).catch((err) => {
            console.log(err);
            this.loadclientes = false;
        })
    }

    private asingUsuarios() {
        this.loadusuarios = true;
        this.data.usuarios(this.getImei())
            .then(data => {
                console.log(data);
                this.contador++;
                this.iniasing();
                this.loadusuarios = false;
            }).catch((err) => {
            console.log(err);
            this.loadusuarios = false;
        })
    }


    private asingAlmacenes() {
        this.loadalmacenes = true;
        this.data.almacenes(this.getImei())
            .then(data => {
                console.log(data);
                this.contador++;
                this.iniasing();
                this.loadalmacenes = false;
            }).catch((err) => {
            console.log(err);
            this.loadalmacenes = false;
        })
    }

    private asingPrecios() {
        this.loadlistprecios = true;
        this.data.listaprecios(this.getImei())
            .then(data => {
                console.log(data);
                this.contador++;
                this.iniasing();
                this.loadlistprecios = false;
            }).catch((err) => {
            console.log(err);
            this.loadlistprecios = false;
        })
    }

    private asingUnidades() {
        this.loadlistunidades = true;
        this.data.listaunidades(this.getImei())
            .then(data => {
                console.log(data);
                this.contador++;
                this.iniasing();
                this.loadlistunidades = false;
            }).catch((err) => {
            console.log(err);
            this.loadlistunidades = false;
        })
    }

    public iniasing() {
        if (this.contador < this.aux.length) {
            this.despierto();
            let name = this.aux[this.contador].name;
            switch (name) {
                case "productos":
                    this.asingProductos();
                    break;
                case "clientes":
                    this.asingClientes();
                    break;
                case "usuarios":
                    this.asingUsuarios();
                    break;
                case "almacenes":
                    this.asingAlmacenes();
                    break;
                case "listprecios":
                    this.asingPrecios();
                    break;
                case "listunidades":
                    this.asingUnidades();
                    break;
            }
        } else {
            this.spinnerDialog.hide();
            this.toast.show(`Finalizo la sincronización`, '6000', 'top').subscribe(toast => {
                setTimeout(() => {
                    this.navCrl.pop();
                    this.isenabled = true;
                    this.dormir();
                }, 100)
            });
        }
    }

    public header() {
        return new Promise((resolve, reject) => {
            this.documentoService.findAllEnvio().then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject(err);
            })
        })
    }

    async pedidosarr(x = 1) {
        if (x == 1) {
            this.documentEnvioxxxx = [];
            this.documentEnvio = [];
            this.i = 0;
            this.load = true;
            this.toast.show(`Exportando datos !!Espere POR FAVOR`, '3000', 'top').subscribe(toast => {
            });
            this.isenabled = false;
            this.despierto();
            this.documentEnvioxxxx = await this.header();
            this.totalenvio = this.documentEnvioxxxx.rows.length;
        }
        if (this.i < this.totalenvio) {
            let header = this.documentEnvioxxxx.rows.item(this.i);
            this.detallesService.findWhere(header.id).then((respx: any) => {
                let u = [];
                for (let i = 0; i < respx.rows.length; i++) {
                    u.push(respx.rows.item(i));
                }
                this.authenticationService.getUser().then((resp: any) => {
                    let documentosarr = {
                        usuariodataid: resp.respuesta.idUsuario,
                        catidadDetalle: respx.rows.length,
                        header: header,
                        detalles: u
                    };
                    this.documentEnvio.push(documentosarr);
                    this.i++;
                    this.pedidosarr(0);
                }).catch((err: any) => {
                    console.log(err);
                })
            }).catch((err: any) => {
                this.load = false;
                this.dormir();
            })
        } else {
            if (this.totalenvio != 0) {
                this.data.pedidosAdd(this.documentEnvio).then((respuesta: any) => {
                    this.toast.show(respuesta.mensaje, '5000', 'top').subscribe(toast => {
                    });
                    this.load = false;
                    this.isenabled = true;
                    this.dormir();
                    this.sincronizar();
                    this.documentoService.updateDocuments(respuesta.respuesta);
                }).catch((e: any) => {
                    this.load = false;
                    this.toast.show(`!ERROR El tiempo de espera a superado inténtalo nuevamente:`, '5000', 'top').subscribe(toast => {
                    });
                    this.dormir();
                    this.isenabled = true;
                    this.navCrl.pop();
                })
            } else {
                this.load = false;
                this.isenabled = true;
                this.dormir();
                this.sincronizar();
            }
        }
    }

    public sincronizar() {
        this.isenabled = false;
        this.toast.show(`Importando datos !!Espere por favor`, '5000', 'top').subscribe(toast => {
        });
        this.contador = 0;
        this.aux = [];
        let cont = 0;
        for (let item of this.estados) {
            if (item.estado == true) {
                this.aux[cont] = item;
                cont++;
            }
        }
        this.iniasing();
    }
}
