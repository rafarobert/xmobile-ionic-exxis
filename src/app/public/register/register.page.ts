import { Component, OnInit } from '@angular/core';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {DatarestService} from "../../services/datarest.service";
import {NavController} from '@ionic/angular';
import {Toast} from '@ionic-native/toast/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {Device} from '@ionic-native/device/ngx';
import {LocalidadService} from "../../modelos/localidad.service";
import { concat } from 'rxjs';

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
  //userhash: string = "";
  //userpassword: string = "";
  userjob: string = "";
  //userplatform: string = "";
  //userplatformplatform: string = "";
  //useruuid: string = "";
  txtBusqueda: string = "";
  public etiquetas: any;

  constructor(private datarestService: DatarestService,
              private spinnerDialog: SpinnerDialog,
              private navCrl: NavController,
              private toast: Toast,
              private uid: Uid,
              private device: Device,
              public  localidadService: LocalidadService) {
                this.etiquetas = [];
               }

  private ngLabels() {
    this.datarestService.getLocalidad(1).then((result: any) => {
        this.etiquetas = result;
    });
  }

  ngOnInit() {    
    this.ngLabels();
  }

    public getPersona() {
      this.spinnerDialog.show(null, "Espere...", true);
      this.datarestService.getPersona(this.txtBusqueda).then((result: any) => {
        this.nrodocumento = result[0].documentoIdentidadPersona;
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
    if (this.validarUsuario()== true )
    {
      this.spinnerDialog.show(null, "Espere...", true);
      let usuario = {
        username: this.userlogin,
        passwordHash: '123456',
        plataformaUsuario: 'm',
        plataformaEmei: this.uid.IMEI,
        plataformaPlataforma: this.device.platform,
        idPersona: this.idpersona,
        estadoUsuario: "2",
        reset: "0"
      };
      this.datarestService.saveUsuario(usuario).then((result: any) => {
        this.spinnerDialog.hide();
        this.gotoHome();
      }).catch((error: any) => {      
        this.spinnerDialog.hide();
        this.toast.show(error.error, '3000', 'top').subscribe(toast => {
        });
      });
    }
  }

  async gotoHome(){       
    this.navCrl.navigateRoot(`login`);
  }

  public validarUsuario()
  {
    let mensajeError = "";
    if (this.userlogin == ""){mensajeError="El usuario es necesario";}
    else if (this.userjob == ""){mensajeError="La empresa es necesario";}
    if (mensajeError != ""){
        this.toast.show(mensajeError, '3000', 'top').subscribe(
          Toast => {
            console.log(Toast);
          });        
        return false;
    }
    else{
      return true;
    }
  }
}
