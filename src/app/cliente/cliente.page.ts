import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientesService} from "../modelos/clientes.service"

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
    public data: any;
    public item: any;

    constructor(private activatedRoute: ActivatedRoute, public  clientesService: ClientesService) {
    }

    ngOnInit() {
        this.data = this.activatedRoute.snapshot.paramMap.get('id');
        this.item = JSON.parse(decodeURIComponent(this.data));
        /*  this.data = this.activatedRoute.snapshot.paramMap.get('id');
          this.clientesService.find(this.data).then((data: any) => {
              this.item = data;
          }).catch((err) => {
              console.log(err)
          })*/
    }

}
