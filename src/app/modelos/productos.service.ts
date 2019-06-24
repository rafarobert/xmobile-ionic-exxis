import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import * as _ from 'lodash';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    private model = 'productos-db';

    constructor(private nativeStorage: NativeStorage, private storage: Storage) {

    }

    public list() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model)
                .then((data: any) => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        })
    }

    public find(seach: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model).then((data: any) => {
                resolve(_.find(data, {'ItemCode': seach}));
            }, error => {
                reject(error);
            });
        })
    }

}
