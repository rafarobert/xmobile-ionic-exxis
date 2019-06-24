import {Component, OnInit} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {AuthGuardService} from '../services/auth-guard.service';
import {NavController} from '@ionic/angular';
import {LocalidadService} from "../modelos/localidad.service";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.page.html',
    styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
    public items: any;
    public itemsSearch: any;
    public etiquetas: any;

    constructor(private navCrl: NavController,
                private nativeStorage: NativeStorage,
                private authService: AuthGuardService, public  localidadService: LocalidadService) {
        this.items = [];
        this.itemsSearch = [];
        this.etiquetas = [];
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
    }

    ngOnInit() {
        this.ngLabels();
        this.authService.canActivate().then(resp => {
            if (resp != true) {
                this.navCrl.navigateRoot(`login`);
            } else {
                this.navCrl.navigateRoot(`clientes`);
            }
        });
        setTimeout(() => {
            this.nativeStorage.getItem('clientes-db').then((data: any) => {
                this.items = data;
                this.itemsSearch = data;
            }, error => {

            });
        }, 100)
    }

    public findItem(item: any) {
        let tesp = encodeURIComponent(JSON.stringify(item));
        this.navCrl.navigateForward(`cliente/` + tesp);
        //this.navCrl.navigateForward(`cliente/` + item);
    }

    public search(args: string) {
        if (args.length === 0) {
            return this.itemsSearch
        }
        let arr = [];
        return this.itemsSearch.filter(data => {
            if (data.CardName.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > 0)
                return arr.push(data);
        });
    }

    public buscar(event: any) {
        this.items = [];
        var search = event.detail.value;
        let result = this.search(search);
        this.items = result;
    }

}
