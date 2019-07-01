import {Component, OnInit} from '@angular/core';
import {DatarestService} from '../services/datarest.service';
import {Uid} from '@ionic-native/uid/ngx';
import {NavController} from '@ionic/angular';
import {Toast} from '@ionic-native/toast/ngx';
import {LocalidadService} from "../modelos/localidad.service";

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

    constructor(private data: DatarestService, private uid: Uid,
                private toast: Toast, private navCrl: NavController,
                public  localidadService: LocalidadService) {
        this.estados = [];
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
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
    }

    ngOnInit() {
        this.ngLabels();
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
            this.toast.show(`Finalizo la sincronización`, '6000', 'top').subscribe(toast => {
                setTimeout(() => {
                    this.navCrl.pop();
                    this.isenabled = true;
                }, 500)
            });
        }
    }

    public sincronizar() {
        this.isenabled = false;
        this.toast.show(`Iniciando sincronización !!Espere por favor`, '5000', 'top').subscribe(toast => {
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
