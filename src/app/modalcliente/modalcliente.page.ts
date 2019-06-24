import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-modalcliente',
  templateUrl: './modalcliente.page.html',
  styleUrls: ['./modalcliente.page.scss'],
})
export class ModalclientePage implements OnInit {
  public items: any;
  constructor(public navParams: NavParams, public modalController: ModalController,
    private nativeStorage: NativeStorage) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.nativeStorage.getItem('clientes-db').then((data: any) => {
        this.items = data;
      }, error => {

      });
    }, 100)
  }

  public cerrar() {
    this.modalController.dismiss();
  }

  public seleccionar(data: any) {
    this.modalController.dismiss(data);
  }



}
