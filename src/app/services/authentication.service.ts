import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {Toast} from '@ionic-native/toast/ngx';


const TOKEN_KEY = "auth-token";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    public path: string;
    public authenticationState: boolean;

    constructor(private storage: Storage, private platform: Platform,
                private toast: Toast, private http: HTTP,
                private spinnerDialog: SpinnerDialog) {
        //this.path = "http://192.168.88.249/xm/api/login";
        this.path = "http://192.168.50.105:8080/xm/api/login";
        this.platform.ready().then(() => {
            this.checkToken();
        })
    }

    public login(data: any) {
        return new Promise((resolve, reject) => {
            this.spinnerDialog.show(null, "Espere...", true);
            this.http.post(this.path, data, {}).then((data: any) => {
                let resp = JSON.parse(data.data);
                console.log(resp);
                switch (resp.estado) {
                    case (200):
                        this.toast.show(resp.mensaje, '5000', 'top').subscribe(toast => {
                        });
                        this.storage.set(TOKEN_KEY, resp).then(resp => {
                            console.log(resp)
                        })
                        resolve(resp);
                        break;
                    case (201):
                        this.toast.show(resp.mensaje, '5000', 'top').subscribe(toast => {
                        });
                        resolve(201);
                        break;
                    case (202):
                        this.toast.show(resp.mensaje, '5000', 'top').subscribe(toast => {
                        });
                        resolve(202);
                        break;
                }
                this.spinnerDialog.hide();
            }).catch((err: any) => {
                reject(err);
                this.spinnerDialog.hide();
            })
        })
    }

    public logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState = null;
        })
    }

    public getUser() {
        return new Promise((resolve, reject) => {
            this.storage.get(TOKEN_KEY).then((resp: any) => {
                resolve(resp);
            }).catch((err: any) => {
                reject(err);
            })
        })
    }

    public checkToken() {
        return this.storage.get(TOKEN_KEY).then(resp => {
            if (resp) {
                return this.authenticationState = true;
            }
        })
    }

}
