import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  constructor(private model: ModelService) {
    this.model.exeDB().then((data: any) => {
      data.executeSql('CREATE TABLE IF NOT EXISTS persona (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombrePersona varchar(255) NOT  NULL, apellidoPPersona varchar(255) NULL, apellidoMPersona varchar(255) NOT NULL, status INTEGER NOT NULL DEFAULT "10", created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)', [])
        .then(() => {
          console.log('Creado Persona');
        }).catch((e) => {
          console.log("Persona YA existe");
        });
    })
  }
}
