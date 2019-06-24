import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {Toast} from "@ionic-native/toast/ngx";
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';

@Injectable({
    providedIn: 'root'
})

export class NativeService {
    constructor(private network: Network,
                private toast: Toast,
                private nativeStorage: NativeStorage,
                private spinnerDialog: SpinnerDialog) {
    }

    public conexion() {
        this.network.onDisconnect().subscribe(() => {
            this.nativeStorage.setItem("CX", true);
            this.toast.show(`Network was disconnected :-(`, '5000', 'top').subscribe(
                toast => {
                });
        });
        this.network.onConnect().subscribe(() => {
            this.nativeStorage.setItem("CX", false);
            this.toast.show(`Network connected!`, '5000', 'top').subscribe(
                toast => {
                });
            console.log(this.network);
        });
    }

    public statusConexion() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem("CX").then((data: any) => {
                if (data == true) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch((err) => {
                reject(err);
                this.spinnerDialog.hide();
            })
        })
    }


    public statusModo() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem("MODO").then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject(err);
            })
        })
    }

    public statusIP() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('IP').then((data: any) => {
                resolve(true);
            }).catch((err: any) => {
                reject(false);
            })
        })
    }


}
