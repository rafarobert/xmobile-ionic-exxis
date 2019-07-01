import {Injectable} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage/ngx";

@Injectable({
    providedIn: 'root'
})
export class AlmacenService {
    public model: string;

    constructor(private nativeStorage: NativeStorage) {
        this.model = "almacenes-db";
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

}
