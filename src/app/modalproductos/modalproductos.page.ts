import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-modalproductos',
  templateUrl: './modalproductos.page.html',
  styleUrls: ['./modalproductos.page.scss'],
})
export class ModalproductosPage implements OnInit {
  public items: any;
  public cantidad: number;
  constructor(public navParams: NavParams, public modalController: ModalController,
    private nativeStorage: NativeStorage, private dialogs: Dialogs) {
    this.items = [];
    this.cantidad = 0;
  }

  ngOnInit() {
    setTimeout(() => {
      this.nativeStorage.getItem('productos-db').then((data: any) => {
        this.items = data;
      }, error => {

      });
    }, 100)
  }

  public cerrar() {
    this.modalController.dismiss();
  }

  public respuesta() {

  }

  public seleccionar(data: any) {


    this.dialogs.prompt('Que cantidad?', 'Xmobile', ["OK", "Cancelar"]).then((resp: any) => {
      if (resp.buttonIndex == 1) {
        if (resp.input1 >= 1) {
          data.cantidad = resp.input1;
          this.modalController.dismiss(data);
        }
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }


}
