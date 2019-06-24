import {Component, OnInit} from '@angular/core';
import {DatarestService} from "../services/datarest.service"
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';
import {NavController} from "@ionic/angular";
import {Toast} from "@ionic-native/toast/ngx";
import {Dialogs} from '@ionic-native/dialogs/ngx';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
    public passwordx: string;
    public passwordconfig: string;

    constructor(private datarestService: DatarestService,
                private navCrl: NavController, private toast: Toast, private dialogs: Dialogs,
                private spinnerDialog: SpinnerDialog) {
        this.passwordx = "";
        this.passwordconfig = "";
    }

    ngOnInit() {
    }

    public dia() {
        return new Promise((resolve, reject) => {
            this.dialogs.confirm('Confirmar', 'Exxis', ['OK', 'Cancelar'])
                .then((resp: any) => {
                    resolve(resp);
                })
                .catch(e => {
                    reject(e)
                });
        })
    }

    async cambiarPass() {
        if (this.passwordx === this.passwordconfig && this.passwordx != "" && this.passwordconfig != "") {
            let y = await this.dia();
            if (y == 1) {
                this.spinnerDialog.show(null, "Espere...", true);
                let p = await this.datarestService.changePass(this.passwordx);
                this.spinnerDialog.hide();
                this.navCrl.pop();
            }
        } else {
            this.toast.show(`Password no son iguales o no son validos.`, '5000', 'top').subscribe(toast => {
            });
        }
    }

}
