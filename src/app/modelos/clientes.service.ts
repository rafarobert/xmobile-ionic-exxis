import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    private model = 'clientes-db';

    constructor(private nativeStorage: NativeStorage) {

        this.nativeStorage.getItem(this.model)
            .then((data: any) => {
                console.log(data);
            }, error => {
                console.log(error);
            });
    }


    public find(seach: string) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(this.model).then((data: any) => {
                resolve(_.find(data, {'CardCode': seach}));
            }, error => {
                reject(error);
            });
        })
    }


}
