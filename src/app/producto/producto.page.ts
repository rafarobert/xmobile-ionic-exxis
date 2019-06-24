import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductosService} from '../modelos/productos.service';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.page.html',
    styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
    public data: any;
    public item: any;

    constructor(private activatedRoute: ActivatedRoute,
                public modelProductos: ProductosService) {

    }

    ngOnInit() {
        this.data = this.activatedRoute.snapshot.paramMap.get('id');
        this.item = JSON.parse(decodeURIComponent(this.data));
        /*this.modelProductos.find(this.data).then((data: any) => {
           this.item = data;
         }).catch((err) => {
           console.log(err)
         })*/
    }

}
