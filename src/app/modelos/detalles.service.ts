import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
    providedIn: 'root'
})
export class DetallesService {

    constructor(private model: ModelService) {
        this.createTable();
    }

    public createTable() {
        let sql = 'CREATE TABLE rdr1 (\n' +
            '  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,\t\n' +
            '  DocEntry integer DEFAULT NULL,\n' +
            '  DocNum integer DEFAULT NULL,\n' +
            '  LineNum integer DEFAULT NULL,\n' +
            '  BaseType integer DEFAULT NULL,\n' +
            '  BaseEntry integer DEFAULT NULL,\n' +
            '  BaseLine integer DEFAULT NULL,\n' +
            '  LineStatus varchar(1) DEFAULT NULL,\n' +
            '  ItemCode varchar(50) NOT NULL,\n' +
            '  Dscription varchar(100) NOT NULL,\n' +
            '  Quantity decimal(19,6) NOT NULL,\n' +
            '  OpenQty decimal(19,6) DEFAULT NULL,\n' +
            '  Price decimal(19,6) NOT NULL,\n' +
            '  Currency varchar(3) NOT NULL,\n' +
            '  DiscPrcnt decimal(19,6) DEFAULT NULL,\n' +
            '  LineTotal decimal(19,6) NOT NULL,\n' +
            '  WhsCode varchar(50) NOT NULL,\n' +
            '  CodeBars varchar(254) DEFAULT NULL,\n' +
            '  PriceAfVAT decimal(19,6) DEFAULT NULL,\n' +
            '  TaxCode varchar(8) DEFAULT NULL,\n' +
            '  U_4DESCUENTO decimal(19,6) DEFAULT NULL,\n' +
            '  U_4LOTE varchar(30) DEFAULT NULL,\n' +
            '  GrossBase integer NOT NULL,\n' +
            '  idDocumento integer NOT NULL,\n' +
            '  fechaAdd datetime NOT NULL,\n' +
            '  unidadid varchar(20) NOT NULL,\n' +
            '  tc varchar(20) NOT NULL\n' +
            ')';
        this.model.exeDB().then((data: any) => {
            data.executeSql(sql, []).then(() => {
                console.log('Creado tabla detalles');
            }).catch((e: any) => {
                console.log(e);
            });
        })
    }

    public insert(data: any) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO rdr1(id, DocEntry, DocNum, LineNum, BaseType, BaseEntry, BaseLine, LineStatus, ItemCode, Dscription, Quantity, OpenQty, Price, Currency, DiscPrcnt, LineTotal, WhsCode, CodeBars, PriceAfVAT, TaxCode, U_4DESCUENTO, U_4LOTE, GrossBase, idDocumento, fechaAdd, unidadid, tc)";
            sql += "VALUES (NULL, 0, 0, 0, 0, 0, 0, '', '" + data.ItemCode + "', '" + data.Dscription + "', '" + data.Quantity + "', 0, " + data.Price + ", '" + data.Currency + "', 0, " + data.LineTotal + ", '" + data.WhsCode + "', '', 0, '', 0, '', " + data.GrossBase + ", " + data.idDocumento + ", '" + data.fechaAdd + "','" + data.unidadID + "','')";
            this.model.exeDB().then((data: any) => {
                data.executeSql(sql, []).then((resp: any) => {
                    resolve(resp);
                }).catch((e: any) => {
                    reject(e);
                });
            })
        })
    }

    public findWhere(id: any) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM rdr1 WHERE idDocumento = " + id;
            this.model.exeDB().then((data: any) => {
                data.executeSql(sql, []).then((resp: any) => {
                    resolve(resp);
                }).catch((e: any) => {
                    reject(e);
                });
            })
        })
    }


}
