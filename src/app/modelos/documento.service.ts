import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private model: ModelService) {
    this.createTable();
  }

  public createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS ordr (\n\
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,\n\
      DocEntry integer NOT NULL,\n\
      DocNum integer NOT NULL,\n\
      DocType varchar(255) DEFAULT NULL,\n\
      canceled varchar(255) DEFAULT NULL,\n\
      Printed varchar(255) DEFAULT NULL,\n\
      DocStatus varchar(255) DEFAULT NULL,\n\
      DocDate varchar(12) DEFAULT NULL,\n\
      DocDueDate varchar(12) DEFAULT NULL,\n\
      CardCode varchar(15) DEFAULT NULL,\n\
      CardName varchar(100) DEFAULT NULL,\n\
      NumAtCard varchar(100) DEFAULT NULL,\n\
      DiscPrcnt NUMERIC DEFAULT NULL,\n\
      DiscSum NUMERIC DEFAULT NULL,\n\
      DocCur varchar(3) DEFAULT NULL,\n\
      DocRate NUMERIC DEFAULT NULL,\n\
      DocTotal NUMERIC DEFAULT NULL,\n\
      PaidToDate NUMERIC DEFAULT NULL,\n\
      Ref1 varchar(11) DEFAULT NULL,\n\
      Ref2 varchar(11) DEFAULT NULL,\n\
      Comments varchar(254) DEFAULT NULL,\n\
      JrnlMemo varchar(50) DEFAULT NULL,\n\
      GroupNum integer DEFAULT NULL,\n\
      SlpCode integer DEFAULT NULL,\n\
      Series integer DEFAULT NULL,\n\
      TaxDate varchar(12) DEFAULT NULL,\n\
      LicTradNum varchar(32) DEFAULT NULL,\n\
      Address varchar(250) DEFAULT NULL,\n\
      UserSign integer DEFAULT NULL,\n\
      CreateDate varchar(12) DEFAULT NULL,\n\
      UserSign2 integer DEFAULT NULL,\n\
      UpdateDate varchar(12) DEFAULT NULL,\n\
      U_4MOTIVOCANCELADO integer DEFAULT NULL,\n\
      U_4NIT varchar(30) DEFAULT NULL,\n\
      U_4RAZON_SOCIAL varchar(100) DEFAULT NULL,\n\
      U_LATITUD varchar(30) DEFAULT NULL,\n\
      U_LONGITUD varchar(30) DEFAULT NULL,\n\
      U_4SUBTOTAL NUMERIC DEFAULT NULL,\n\
      U_4DOCUMENTOORIGEN varchar(10) DEFAULT NULL,\n\
      U_4MIGRADOCONCEPTO varchar(250) DEFAULT NULL,\n\
      U_4MIGRADO varchar(255) DEFAULT NULL,\n\
      estadosend integer DEFAULT 1,\n\
      fecharegistro varchar(12),\n\
      fechaupdate varchar(12)\n\
    )';
    this.model.exeDB().then((data: any) => {
      data.executeSql(sql, []).then(() => {
        console.log('Creado tabla Documentos');
      }).catch((e: any) => {
        console.log(e);
      });
    })
  }
}
