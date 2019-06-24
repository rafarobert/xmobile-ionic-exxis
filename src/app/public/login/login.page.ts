import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {AuthGuardService} from '../../services/auth-guard.service';
import {AuthenticationService} from '../../services/authentication.service';
import {NavController} from '@ionic/angular';
import {MenuController} from '@ionic/angular';
import {UserService} from '../../modelos/user.service';
import {PersonaService} from '../../modelos/persona.service';
import {Uid} from '@ionic-native/uid/ngx';
import {Device} from '@ionic-native/device/ngx';
import {Toast} from '@ionic-native/toast/ngx';
import {Storage} from '@ionic/storage';
import {DatarestService} from "../../services/datarest.service";
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {LocalidadService} from "../../modelos/localidad.service"
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {NativeService} from "../../services/native.service";
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
    public password: string;
    public username: string;
    public bool: boolean;
    public ip: string;
    public modo: boolean;
    public est: string;
    public localidadvalue: any;
    public idio: number;
    public etiquetas: any;

    constructor(private authenticationService: AuthenticationService,
                private nativeStorage: NativeStorage, private platform: Platform,
                public modeluser: UserService,
                public  localidadService: LocalidadService,
                public modelpersona: PersonaService,
                private toastController: ToastController,
                private device: Device,
                private authService: AuthGuardService,
                private navCrl: NavController,
                private menuCtrl: MenuController,
                private uid: Uid,
                private toast: Toast,
                private storage: Storage,
                private datarestService: DatarestService,
                private spinnerDialog: SpinnerDialog, private native: NativeService) {


        console.log("Constructor");
        this.bool = true;
        this.ip = '';
        /****************/
        this.username = 'exxis';
        this.password = 'webweb';
        this.username = "";
        this.password = "";
        this.est = 'FUERA DE LINEA';
        this.modo = false;
        this.idio = 0;
        this.etiquetas = [];
        this.localidadvalue = [];
    }

    ngOnInit() {
        this.platform.ready().then(() => {
            this.native.statusIP().then((resp: boolean) => {
                this.bool = resp;
            }).catch((err) => {
                this.bool = false;
            })
        });
    }


    public ipacction() {
        if (this.ip != '') {
            this.nativeStorage.setItem('IP', this.ip).then((data: any) => {
                this.bool = true;
                this.toast.show(`Conectando con IP ${this.ip}.`, '3000', 'top').subscribe(toast => {
                });
            }).catch((err: any) => {
                console.log(err);
            })
        } else {
            this.toast.show(`IP no valido.`, '3000', 'top').subscribe(toast => {
            });
        }
    }

    public validar(e: any) {
        return /^[0-9a-zA-Z]+$/.test(e);
    }

    async login() {
        if (this.username != '' && this.validar(this.username)) {
            if (this.password != '') {
                let data = {
                    usuarioNombreUsuario: this.username,
                    usuarioClaveUsuario: this.password,
                    plataformaTipo: 'm',
                    plataformaPlataforma: this.device.platform,
                    plataformaEmei: this.uid.IMEI,
                };
                this.authenticationService.login(data).then((resp: any) => {
                    if (resp.estado == 200) {
                        this.navCrl.navigateRoot(`home`);
                        // this.navCrl.navigateRoot(`pedidos`);
                    }
                }).catch((err: any) => {
                    let dx = {
                        estado: 200,
                        mensaje: "usuario encontrado",
                        token: "724877574f585949752d416449376e446c77625036636a35744164494b505830313536303337353430325f31353630333735343032",
                        respuesta: {
                            apellidoMPersona: null,
                            apellidoPPersona: "Exxis",
                            estadoPersona: 1,
                            estadoUsuario: 1,
                            idPersona: 1,
                            idUsuario: 12,
                            nombrePersona: "Administrador",
                            nombreUsuario: "exxis",
                        }
                    };
                    this.storage.set("auth-token", dx).then(resp => {
                        this.navCrl.navigateRoot(`home`);
                    })
                });
            } else {
                this.toast.show(`El password no puede ser nulo.`, '5000', 'top').subscribe(
                    toast => {
                        console.log(toast);
                    });
            }
        } else {
            this.toast.show(`El usuario no puede ser nulo.`, '5000', 'top').subscribe(
                toast => {
                    console.log(toast);
                });
        }
    }

    public estaupdate() {
        this.native.statusConexion().then((est: any) => {
            console.log(est);
        }).catch((err: any) => {
            console.log(err);
        })
    }


    /*async estaupdate(estado: any) {
            let ext = await this.native.statusConexion();
            if (estado.detail.checked == true) {
                if (ext == true) {
                    this.est = 'EN LINEA';
                    this.nativeStorage.setItem("MODO", true);
                    this.toast.show(`Modo en linea activado.`, '3000', 'top').subscribe(toast => {
                    });
                } else {
                    this.nativeStorage.setItem("MODO", false);
                    this.modo = false;
                    this.est = 'FUERA DE LINEA';
                    this.toast.show(`No tienes conexion`, '3000', 'top').subscribe(toast => {
                    });
                }
            } else {
                this.nativeStorage.setItem("MODO", false);
                this.modo = false;
                this.est = 'FUERA DE LINEA';
            }
        }




        public getLocalidad() {
            this.presentToast('Selecionar empresa');
            this.spinnerDialog.show(null, "Espere...", true);
            this.datarestService.getLocalidad(0).then((data: any) => {
                this.localidadvalue = data;
                this.spinnerDialog.hide();
            }).catch((err) => {
                console.log(err);
                this.spinnerDialog.hide();
            })
        }

        public leccionarLocalidad() {
            this.spinnerDialog.show(null, "Espere...", true);
            this.datarestService.getLocalidad(this.idio).then((data: any) => {
                this.presentToast('En buena hora.');
                this.ngLabels();
                this.spinnerDialog.hide();
            }).catch((err) => {
                console.log(err);
                this.spinnerDialog.hide();
            })
        }




        ngOnInit() {

            this.authService.canActivate().then(resp => {
                if (resp != true) {
                    this.navCrl.navigateRoot(`login`);
                } else {
                    //  this.navCrl.navigateRoot(`pedidos`);
                    this.navCrl.navigateRoot(`home`);
                }
            });
            this.storage.set('MODO', false);
            this.menuCtrl.enable(false);
        }

        async ngLabels() {
            this.etiquetas = await this.localidadService.etiquetas();
        }

        async presentToast(mensaje: string) {
            const toast = await this.toastController.create({
                message: mensaje,
                duration: 2000,
            });
            toast.present();
        }


        public estadox() {
            return new Promise((resolve, reject) => {
                this.storage.get('MODO').then((resp: any) => {
                    resolve(resp);
                }).catch((err) => {
                    reject(err);
                })
            });
        }

 */
}
