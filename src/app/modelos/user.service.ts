import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private model: ModelService) {
    this.createTable();
  }
  public createTable() {
    this.model.exeDB().then((data: any) => {
      data.executeSql("CREATE TABLE IF NOT EXISTS user ( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username varchar(255) NOT NULL, email varchar(255)  NOT NULL, password varchar(255)  NOT NULL, status INTEGER NOT NULL DEFAULT 10,  created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, idPersona INTEGER NOT NULL )", [])
        .then(() => {
          console.log('Creado User');
        }).catch((e) => {
          console.log("User YA existe");
        });
    })
  }

  public insert() {
    this.model.exeDB().then((data: any) => {
      data.executeSql("insert into user(id,username, email, password, status, created_at, updated_at, idPersona ) values(NULL, 'migurl','migurl@gmail.com','migurl',10,32432432,23432432,3);", [])
        .then(() => {
          console.log('Insertado OK');
        }).catch((e) => {
          console.log(e);
        });
    })
  }

  public list() {
    this.model.exeDB().then((data: any) => {
      data.executeSql("select * from user", [])
        .then((data: any) => {
          console.log(data.rows.length);
          for (let i = 0; i <= data.rows.length; i++) {
            console.log(data.rows.item(i));
          }
        }).catch((e) => {
          console.log(e);
        });
    })
  }

}
