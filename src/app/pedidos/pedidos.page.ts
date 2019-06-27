import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(private navCrl: NavController, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

  }

  public pageSincronizar() {
    this.navCrl.navigateForward(`sincronizar`);
  }


  public detallePedidos() {
    this.navCrl.navigateForward(`detallepedido/0`);
  }

  public crearPedido() {
    this.navCrl.navigateForward(`detallepedido/null`);
  }

}
