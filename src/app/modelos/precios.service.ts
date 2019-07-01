import {Injectable} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class PreciosService {

    public model: string;

    constructor(private nativeStorage: NativeStorage) {
        this.model = "precios-db";
    }


    public findAll() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model).then((data: any) => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public findOne(id: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model).then((data: any) => {
                resolve(_.find(data, {'PriceListNo': id}));
            }).catch(error => {
                reject(error);
            })
        });
    }


}
