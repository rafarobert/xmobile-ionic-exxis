import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalidadService {
    private model = 'localidad-db';

    constructor(private nativeStorage: NativeStorage, private storage: Storage) {
    }

    public etiquetas() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model)
                .then((data: any) => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

    public perfil() {
        return new Promise((resolve, reject) => {
            this.storage.get("auth-token").then(resp => {
                resolve(resp);
            }).catch((err) => {
                reject(err);
            });
        });
    }


}
