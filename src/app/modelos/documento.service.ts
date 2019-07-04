import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

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
      PriceListNum integer DEFAULT NULL,\n\
      estadosend integer DEFAULT 1,\n\
      fecharegistro varchar(12),\n\
      fechaupdate varchar(12),\n\
      fechasend varchar(12),\n\
      rowNum varchar(12)\n\
    )';
        this.model.exeDB().then((data: any) => {
            data.executeSql(sql, []).then(() => {
                console.log('Creado tabla Documentos');
            }).catch((e: any) => {
                console.log(e);
            });
        })
    }


    public insert(data: any) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO ordr(id, DocEntry, DocNum, DocType, canceled, Printed, DocStatus, DocDate, DocDueDate, CardCode, CardName, NumAtCard, DiscPrcnt, DiscSum, DocCur, DocRate, DocTotal, PaidToDate, Ref1, Ref2, Comments, JrnlMemo, GroupNum, SlpCode, Series, TaxDate, LicTradNum,Address, UserSign, CreateDate, UserSign2,UpdateDate, U_4MOTIVOCANCELADO, U_4NIT, U_4RAZON_SOCIAL, U_LATITUD, U_LONGITUD, U_4SUBTOTAL, U_4DOCUMENTOORIGEN, U_4MIGRADOCONCEPTO, U_4MIGRADO, estadosend, fecharegistro, fechaupdate,fechasend, rowNum)" +
                "VALUES(NULL, 0, 0, '" + data.DocType + "', '', '', '', '" + data.DocDate + "', '" + data.DocDueDate + "', '" + data.CardCode + "', '" + data.CardName + "', '', 0, 0, '', 0, 0, 0, '', '', '', '', 0, 0, '" + data.Series + "', '" + data.TaxDate + "', '', '" + data.Address + "', 0, '', 0, '', 0, '', '', '', '', 0, '', '', " + data.PriceListNum + ", 0, '" + data.fecharegistro + "', '','','" + data.rowNum + "')";
            this.model.exeDB().then((data: any) => {
                data.executeSql(sql, []).then((resp: any) => {
                    let sqlx = "SELECT * FROM ordr ORDER BY id DESC LIMIT 1 ";
                    this.model.exeDB().then((data: any) => {
                        data.executeSql(sqlx, []).then((resp: any) => {
                            let ux = resp.rows.item(0);
                            let sqlu = "UPDATE ordr SET DocNum = " + ux.id + " WHERE id = " + ux.id;
                            this.model.exeDB().then((data: any) => {
                                data.executeSql(sqlu, []);
                            })
                            resolve(ux);
                        }).catch((e: any) => {
                            reject(e);
                        });
                    });
                }).catch((e: any) => {
                    reject(e);
                });
            })
        })
    }

    public find(id: number) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM ordr id = " + id;
            this.model.exeDB().then((data: any) => {
                data.executeSql(sql, []).then((data: any) => {
                    resolve(data);
                }).catch((e: any) => {
                    reject(e);
                });
            })
        })
    }


    public findAll() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM ordr ORDER BY id DESC";
            this.model.exeDB().then((data: any) => {
                data.executeSql(sql, []).then((data: any) => {
                    resolve(data);
                }).catch((e: any) => {
                    reject(e);
                });
            })
        })
    }

}
