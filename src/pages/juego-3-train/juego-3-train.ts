import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular';
import * as $ from 'jquery';
//import * as swal from 'sweetalert';
import swal, {
    SweetAlertOptions
} from 'sweetalert2';

import {
    PruebaProvider
} from '../../providers/prueba/prueba';
/**
 * Generated class for the Juego_3TrainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class DeviceInfo2 {
    enun = [];
    res = [];
    numero = 0;
    y: any;
    x = 0;
    c = 0;
    z: any;
    t: any;
    total = 0;
    bien = 0;
    mal = 0;
    now = 0;
    cero = 0;
    prueba: PruebaProvider;
    nav: NavController;
    juju() {

        info.prueba.enviarEntrenamiento({
            movTotales: info.z,
            duracionTotal: info.total,
            correctas: info.bien,
            errores: info.mal
        }, "token", info.x + "");
        if (info.y > 4) {
            info.nav.pop();
        } else {
            info.bien = 0;
            info.now = 0;
            info.mal = 0;
            info.total = 0;
        }

    }
}

let info = new DeviceInfo2();

@IonicPage()
@Component({
    selector: 'page-juego-3-train',
    templateUrl: 'juego-3-train.html',
})
export class Juego_3TrainPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public pruebaProvider: PruebaProvider) {
        info.bien = 0;
        info.mal = 0;
        info.total = 0;
        info.numero = 0;
        info.prueba = this.pruebaProvider;
        info.nav = this.navCtrl;
        info.y = 0;
        info.z = [];
        info.c = 0;

    }
    ionViewDidLeave() {

        clearInterval(info.t);
    }


    ionViewDidLoad() {
        this.setTimer();
        info.enun = [
                       "Toque un cuadrado", //0 grande
                       "Toque el circulo azul", //8 pqw
                       "Toque el cuadrado amarillo y luego el cuadrado azul", //15 and c=2 p
        "Toque el cuadrado verde grande y luego el cuadrado rojo grande", //20 g
"Toque el círculo azul, luego el cuadrado rojo", //23 p
        "Toque la segunda figura después del circulo azul", //32 p
                      ];

        $('#page-heading1').text(info.enun[info.numero]);

        info.res = [
                      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"],
               ["t12"],
               ["t5", "t1"],
               ["t4", "t2"],
               ["t12", "t2"],
               ["t14"]
                     ];

        $('#gridToken').on('click', '.tokenBot .figure', function () {

            var ide = $(this).attr('id');
            var len = info.res[info.numero].length;
            var si = false;
            if (info.numero == 5) {


                for (var i = 0; i < len; i++) {
                    if (ide == info.res[info.numero][i]) {
                        info.y++;
                        info.z[info.numero] = ["1", info.now, ide];
                        info.bien++;
                        info.numero++;
                        console.log("uno");
                        info.now = 0;
                        $('#page-heading1').text(info.enun[info.numero]);

                    } else {

                        info.z[info.numero] = ["0", info.now, ide];
                        info.mal++;
                        console.log("cero");
                        info.numero++;
                        info.now = 0;
                        $('#page-heading1').text(info.enun[info.numero]);

                    }
                }
                info.total=0;

            }
            if (info.numero >= 2 && info.numero < 5) {

                if (ide == info.res[info.numero][info.c]) {
                    si = true;
                    info.c++;
                    console.log(info.c);
                } else {

                    info.z[info.numero] = ["0", info.now, ide];
                    console.log("cero");
                    info.mal++;
                    info.c = 0;
                    info.numero++;
                    info.now = 0;
                    $('#page-heading1').text(info.enun[info.numero]);
                }

                if (info.c == 2) {
                    info.bien++;
                    info.c = 0;
                    info.y++;
                    info.z[info.numero] = ["1", info.now, ide];
                    info.now = 0;
                    console.log("uno");
                    info.numero++;
                    $('#page-heading1').text(info.enun[info.numero]);
                }

            }
            if (info.numero <= 1) {

                for (var i = 0; i < len; i++) {
                    if (ide == info.res[info.numero][i]) {
                        si = true;
                    }
                }
                if (!si) {
                    info.c++;
                } else {
                    if (info.c == 0) {

                        info.z[info.numero] = ["1", info.now, ide];
                        console.log("uno");
                        info.y++;
                        info.numero++;
                        info.now = 0;
                        $('#page-heading1').text(info.enun[info.numero]);
                    } else {
                        if (info.c == 1) {

                            info.z[info.numero] = ["0.5", info.now, ide];
                            console.log("0.5");
                            info.numero++;
                            info.now = 0;
                            $('#page-heading1').text(info.enun[info.numero]);
                            info.c = 0;
                        } else {
                            info.c = 0;

                            info.z[info.numero] = ["0", info.now, ide];
                            console.log("cero");
                            info.numero++;
                            info.now = 0;
                            $('#page-heading1').text(info.enun[info.numero]);
                        }
                    }
                }
            }

            if (info.numero == 6) {
                info.x++;
                if (info.y > 4) {
                    swal({
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        title: 'Felicidades, completaste el entrenamiento!',
                        type: 'success',
                        confirmButtonColor: '#f67b18',
                        confirmButtonText: 'Comenzar Prueba'
                    }).then(info.juju);
                    info.numero = 0;
                } else {

                    swal({
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        title: 'Vuelve a intentarlo!',
                        type: 'warning',
                        confirmButtonColor: '#f67b18',
                        confirmButtonText: 'De nuevo'
                    }).then(info.juju);
                    info.numero = 0;
                    info.y = 0;
                    $('#page-heading1').text(info.enun[info.numero]);
                }


            }

            if (info.numero == 2 && info.c == 2 || info.numero == 3 || info.numero == 0) {
                $('.containTokenPeque').attr("style", "display:absolute");
            } else {
                $('.containTokenPeque').attr("style", "display:none");
            }
            info.now;
        });
    }
    setTimer() {
        info.now = 0;
        info.t = setInterval(function () {
            info.now = info.now + 100;
            info.total = info.total + 100;
        }, 100);
    };
}
