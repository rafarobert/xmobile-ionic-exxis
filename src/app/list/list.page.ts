import {Component, OnInit} from '@angular/core';
import {LocalidadService} from "../modelos/localidad.service";
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public items: Array<{ title: string; note: string; icon: string }> = [];
    public etiquetas: any;
    public datos: any;

    constructor(public  localidadService: LocalidadService, private navCrl: NavController) {
        this.etiquetas = [];
        this.datos = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }

    public settingPass() {
        this.navCrl.navigateForward(`setting`);
    }

    async ngLabels() {
        this.etiquetas = await this.localidadService.etiquetas();
    }

    async perfil() {
        let pr: any = await this.localidadService.perfil();
        this.datos = pr.respuesta;
    }

    ngOnInit() {
        this.ngLabels();
        this.perfil();
    }
}
