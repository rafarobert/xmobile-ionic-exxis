import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public isOpen: boolean;
  public dbx: SQLiteObject;
  constructor(private sqlite: SQLite, private platform: Platform) {


  }

  public exeDB() {
    return new Promise((resolver, rechazar) => {
      this.platform.ready().then(() => {
        if (!this.isOpen) {
          this.sqlite.create({
            name: 'exxis.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            this.dbx = db;
            this.isOpen = true;
            resolver(this.dbx);
          }).catch(e => {
            rechazar(e);
          });
        } else {
          resolver(this.dbx);
        }
      });
    })
  }



}
