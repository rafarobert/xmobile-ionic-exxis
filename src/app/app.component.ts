import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {ModelService} from './modelos/model.service';
import {DocumentoService} from './modelos/documento.service';
import {AuthenticationService} from './services/authentication.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalidadService} from "./modelos/localidad.service";
import {Toast} from "@ionic-native/toast/ngx";
import {Uid} from "@ionic-native/uid/ngx";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {Dialogs} from "@ionic-native/dialogs/ngx";
import {NativeService} from "./services/native.service"
import {Network} from "@ionic-native/network/ngx";
import {NativeStorage} from "@ionic-native/native-storage/ngx";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [];
    public etiquetas: any;
    public datos: any;
    public nombrePersona: string;
    public apellidoMPersona: string;
    public nombreUsuario: string;

    /* {
   title: 'Inicio',
   url: '/home',
   icon: 'home'
 },
, {
           title: 'Historial',
           url: '/list',
           icon: 'paper'
         },*/

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar, private network: Network,
                private menuCtrl: MenuController, private nativeStorage: NativeStorage,
                private router: Router, private dialogs: Dialogs,
                private model: ModelService,
                private uid: Uid, private androidPermissions: AndroidPermissions,
                private documentoService: DocumentoService,
                public  localidadService: LocalidadService,
                private authenticationService: AuthenticationService,
                private toast: Toast, private native: NativeService) {
        this.initializeApp();
        this.etiquetas = [];
        this.nombrePersona = "";
        this.apellidoMPersona = "";
        this.nombreUsuario = "";


    }


    public getPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
            if (res.hasPermission) {
            } else {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
                    this.dialogs.confirm('Permiso concedido por favor reinicie la aplicación!', 'Xmobile', ['OK'])
                        .then((rest: any) => {
                            navigator['app'].exitApp();
                        })
                        .catch(e => console.log('Error displaying dialog', e));

                }).catch(error => {
                    this.toast.show(`El dispositivo no permite dar permiso a esta aplicacion`, '5000', 'top').subscribe(
                        toast => {
                        });
                });
            }
        }).catch(error => {
            this.toast.show(`El dispositivo no permite dar permiso a esta aplicacion`, '5000', 'top').subscribe(
                toast => {
                });
        });
    }


    public eventoMenu() {
        this.etiquetas = [];
        this.ngLabels();
        this.perfil();
    }

    async perfil() {
        let pr: any = await this.localidadService.perfil();
        if (pr != null) {
            this.datos = pr.respuesta;
            this.nombrePersona = this.datos.nombreUsuario;
            this.apellidoMPersona = this.datos.apellidoMPersona;
            this.nombreUsuario = this.datos.nombreUsuario;
        }
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
        this.appPages = [
            {
                title: 'Doc. Pedidos',
                url: '/pedidos',
                icon: 'document'
            },
            {
                title: this.etiquetas.men_Product,
                url: '/home',
                icon: 'clipboard'
            },
            {
                title: this.etiquetas.men_Client,
                url: '/clientes',
                icon: 'contacts'
            },
            {
                title: this.etiquetas.men_Profile,
                url: '/list',
                icon: 'person'
            }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.ngLabels();
            this.perfil();
            this.getPermission();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#112848');
            this.splashScreen.hide();
            this.network.onDisconnect().subscribe(() => {
                this.nativeStorage.setItem("CX", 0).then(() => {
                    this.toast.show(`Red fue desconectada :-(`, '5000', 'top').subscribe(
                        toast => {
                        });
                })
            });
            this.network.onConnect().subscribe(() => {
                this.nativeStorage.setItem("CX", 1).then(() => {
                    this.toast.show(`Red conectada!`, '5000', 'top').subscribe(
                        toast => {
                        });
                })
            });

            setTimeout(() => {
                if (this.network.type != 'none') {
                    this.nativeStorage.setItem("CX", 1).then(() => {
                    })
                } else {
                    this.nativeStorage.setItem("CX", 0).then(() => {
                    })
                }
            }, 2000);

        });
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event['url'] == '/') {
                this.menuCtrl.enable(true);
            }
        });
    }

    public exit() {
        this.authenticationService.logout();
        navigator['app'].exitApp();
    }

}
