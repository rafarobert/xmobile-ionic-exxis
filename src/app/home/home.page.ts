import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {AuthGuardService} from '../services/auth-guard.service';
import {ProductosService} from '../modelos/productos.service';
import {Storage} from '@ionic/storage';
import {DatarestService} from "../services/datarest.service"
import {LocalidadService} from "../modelos/localidad.service";
import {NativeService} from "../services/native.service"
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Toast} from "@ionic-native/toast/ngx";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public items: any;
    public itemsSearch: any;
    public etiquetas: any;
    public estadox: any;
    public loadItem: boolean;
    public loadData: any;

    constructor(private navCrl: NavController, public  localidadService: LocalidadService,
                private menuCtrl: MenuController, private nativeService: NativeService,
                private authService: AuthGuardService, private nativeStorage: NativeStorage,
                public modelProductos: ProductosService, private toast: Toast,
                private storage: Storage, private datarestService: DatarestService) {
        this.menuCtrl.enable(true);
        this.items = [];
        this.itemsSearch = [];
        this.etiquetas = [];
        this.estadox = true;
        this.loadData = false;
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
    }

    ngOnInit() {
        this.authService.canActivate().then(resp => {
            if (resp != true) {
                this.navCrl.navigateRoot(`login`);
            } else {
                this.navCrl.navigateRoot(`home`);
            }
        });
        this.find();
        this.ngLabels();
    }

    ionViewWillEnter() {
        this.find();
        this.resetPass();
        this.estadoModo();
    }

    public resetPass() {
        this.storage.get('auth-token').then((resp: any) => {
            console.log("TIPO DE SSSION")
            if (resp.respuesta.reset == 0) {
                this.navCrl.navigateForward(`setting`);
            }
        })
    }

    async estadoModo() {
        this.estadox = await this.nativeService.statusModo();
    }

    async toggelEstado() {
        let est = await this.nativeService.statusConexion();
        if (est == true) {
            if (this.estadox == true) {
                this.nativeStorage.setItem("MODO", false).then(() => {
                    this.estadoModo();
                    this.toast.show(`Modo en linea activado.`, '3000', 'bottom').subscribe(toast => {
                    });
                })
            } else {
                this.nativeStorage.setItem("MODO", true).then(() => {
                    this.estadoModo();
                })
            }
        } else {
            this.nativeStorage.setItem("MODO", false).then(() => {
                this.estadoModo();
                this.toast.show(`No tienes conexion`, '3000', 'bottom').subscribe(toast => {
                });
            })
        }
    }

    public find() {
        this.modelProductos.list().then((data: any) => {
            this.items = data;
            this.itemsSearch = data;
        }).catch((err) => {
        });
    }

    public findItem(item: any) {
        let tesp = encodeURIComponent(JSON.stringify(item));
        this.navCrl.navigateForward(`producto/` + tesp);
    }

    public pageSincronizar() {
        this.navCrl.navigateForward(`sincronizar`);
    }

    public tapIonSlideTap() {
        this.navCrl.navigateForward(`listaproducto`);
    }

    public search(args: string) {
        if (args.length === 0) {
            return this.itemsSearch
        }
        let arr = [];
        return this.itemsSearch.filter(data => {
            if (data.ItemName.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) != -1)
                return arr.push(data);
        });
    }

    async buscar(event: any) {
        this.items = [];
        this.loadItem = true;
        var search = event.detail.value;
        if (search.length === 0) {
            return this.itemsSearch
        }
        let modo = await this.nativeService.statusModo();
        if (modo == true) {
            let result = this.search(search);
            this.items = result;
            if (this.items.length > 0) {
                this.loadItem = false;
            }
        } else {
            this.datarestService.productosSearch(search).then((data: any) => {
                this.items = data.value;
                if (this.items.length > 0) {
                    this.loadItem = false;
                }
            }).catch((error: any) => {
                console.log(error);
            });
        }
    }
}
