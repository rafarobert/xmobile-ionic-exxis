import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Storage} from '@ionic/storage';
import {AuthenticationService} from "./authentication.service";
import {Uid} from "@ionic-native/uid/ngx";
import {Device} from '@ionic-native/device/ngx';
import {NativeService} from "./native.service"


const TOKEN_KEY = "auth-token";

@Injectable({
    providedIn: 'root'
})
export class DatarestService {
    public path: string;
    public header: any;

    constructor(private http: HTTP, private storage: Storage,
                private nativeStorage: NativeStorage, private uid: Uid,
                private device: Device,
                private authenticationService: AuthenticationService,
                private nativeService: NativeService) {        
    }

    public getLocalidad(id: any) {
        let u = '';
        if (id == 0) {
            u = '0';
        } else {
            u = '/' + id;
        }
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.http.get(url + "api/localidad" + u, {}, {})
                    .then((data: any) => {
                        let json = JSON.parse(data.data);
                        if (id == 0) {
                            console.log('Lista lugares');
                            resolve(json);
                        } else {
                            this.nativeStorage.setItem('localidad-db', json).then(() => {
                                resolve('Creado localidad');
                            }, error => {
                                reject(error);
                            });

                        }
                    }).catch((err: any) => {
                    reject(err);
                })
            })
        })
    }

    public pedidosAdd(term: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.setDataSerializer('json');
                    this.http.post(url + "api/pedido?access-token=" + resp.token, term, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            resolve(json);
                        }).catch((err: any) => {
                        reject(err);
                    })
                })
            });
        })
    }

    public productosSearch(term: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.post(url + "api/items?access-token=" + resp.token, {filtro: term}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            resolve(json);
                        }).catch((err: any) => {
                        reject(err);
                    })
                })
            });
        })
    }


    public clientes() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/clientes?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('clientes-db', json.value).then(() => {
                                resolve('Clientes Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }

    public productos() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/items?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('productos-db', json.value).then(() => {
                                resolve('Productos Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }

    public usuarios(emei: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/user?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('usuarios-db', json.value).then(() => {
                                resolve('Usuarios Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }


    public almacenes(emei: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/almacenes?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('almacenes-db', json.value).then(() => {
                                resolve('Almacenes Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }

    public listaprecios(emei: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/listaprecios?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('precios-db', json.value).then(() => {
                                resolve('Precios Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }

    public listaunidades(emei: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    this.http.get(url + "api/listaunidades?access-token=" + resp.token, {}, {})
                        .then((data: any) => {
                            let json = JSON.parse(data.data);
                            this.nativeStorage.setItem('unidades-db', json.value).then(() => {
                                resolve('Unidades Almacendos');
                            }, error => {
                                reject(error);
                            });
                        }).catch((err: any) => {
                        console.log(err);
                    })
                })
            })
        })
    }


    public changePass(passtext: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.storage.get(TOKEN_KEY).then(resp => {
                    let ix = resp.respuesta.idUsuario
                    this.http.put(url + "api/pass/" + ix + "?access-token=" + resp.token,
                        {nuevopass: passtext}, {})
                        .then((data: any) => {
                            let datos = {
                                usuarioNombreUsuario: resp.respuesta.nombreUsuario,
                                usuarioClaveUsuario: passtext,
                                plataformaTipo: 'm',
                                plataformaPlataforma: this.device.platform,
                                plataformaEmei: this.uid.IMEI,
                            };
                            console.log(datos);
                            this.authenticationService.login(datos).then((r: any) => {
                                resolve(r);
                            }).catch((e) => {
                                reject(e);
                            });
                        }).catch((err: any) => {
                        reject(err);
                    })
                })
            })
        })
    }

    public getPersona(id: any) {
        return new Promise((resolve, reject) => {
                this.nativeStorage.getItem('IP').then((url: any) => {
                     this.http.get(url + "api/olicitudregistro/78912345",{},{}).then((result: any) => {
                        resolve(JSON.parse(result.data));
                    }).catch((error: any) => {
                        reject(error);
                });
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public saveUsuario(data: any){
            return new Promise((resolve,reject) => {
                this.nativeStorage.getItem('IP').then((url: any) => {
                this.http.post(url + "api/solicitudregistro",data,{}).then((result: any) => {
                    resolve(JSON.parse(result.data));
                }).catch((error: any) => {
                    reject(error);
                });
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public getLocalidadParaRegistro() {
        let u = '/1';
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((url: any) => {
                this.http.get(url + "api/localidad" + u, {}, {})
                    .then((data: any) => {
                        let json = JSON.parse(data.data);
                        resolve(json);
                    }).catch((err: any) => {
                    reject(err);
                })
            })
        })
    }
}
