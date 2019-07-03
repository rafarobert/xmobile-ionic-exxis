import { Component, OnInit } from '@angular/core';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {DatarestService} from "../../services/datarest.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  idpersona: string = "";
  nrodocumento: string = "";
  personanombre: string = "";
  personapaterno: string = "";
  personamaterno: string = "";
  userlogin: string = "";
  userhash: string = "";
  userpassword: string = "";
  userjob: string = "";
  userplatform: string = "";
  userplatformplatform: string = "";
  useruuid: string = "";

  constructor(private datarestService: DatarestService,
              private spinnerDialog: SpinnerDialog) { }

  ngOnInit() {
  }

    public getPersona() {
      this.spinnerDialog.show(null, "Espere...", true);
      this.nrodocumento = "78912345";    
      this.datarestService.getPersona(this.nrodocumento).then((result: any) => {
        this.idpersona = result[0].idPersona;
        this.personanombre = result[0].nombrePersona;
        this.personapaterno = result[0].apellidoPPersona;
        this.personamaterno = result[0].apellidoMPersona;
        this.spinnerDialog.hide();
        console.log(result);
        console.log(result[0]);
      }).catch((error: any) => {
        console.log(error);
        this.spinnerDialog.hide();
      });
  }

  public saveUsuario(){
    this.spinnerDialog.show(null, "Espere...", true);
    let usuario = {
      idPersona : this.idpersona, 
      nombrePersona : this.personanombre,
      apellidoPPersona : this.personapaterno,
      apellidoMPersona : this.personamaterno,
      estadoPersona: 1,
      fechaUMPersona: new Date().toISOString(),
      documentoIdentidadPersona: this.nrodocumento
    };
    this.spinnerDialog.hide();
  }
}
