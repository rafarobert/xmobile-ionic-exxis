import {Injectable} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class UnidadesService {
    public model: string;

    constructor(private nativeStorage: NativeStorage) {
        this.model = "unidades-db";
    }

    public findOne(id: any) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model).then((data: any) => {
                resolve(_.find(data, {'AbsEntry': id}));
            }).catch(error => {
                reject(error);
            })
        });
    }
}
