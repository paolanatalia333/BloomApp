import {
     Component
} from '@angular/core';
import {
     IonicPage,
     NavController,
     NavParams
} from 'ionic-angular';
import * as $ from 'jquery';
import {
     AlertController
} from 'ionic-angular';
import swal, {
     SweetAlertOptions
} from 'sweetalert2';

import {
     PruebaProvider
} from '../../providers/prueba/prueba';

/**
 * Generated class for the Juego_1TrainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


class DeviceInfo6 {
     arriba = [];
     abajo = [];
     res = [];
     numero = 0;
     x: any;
     y: any;
     z: any;
     prueba: PruebaProvider;
     nav: NavController;
     juju() {
          info.prueba.enviarEntrenamiento({
                 movTotales: info.x
            }, "stroop",info.z+"");
          if(info.y<4){

               info.y=0;
          }else{

          info.nav.pop();
          }
     }
}

let info = new DeviceInfo6();

@IonicPage()
@Component({
     selector: 'page-juego-1-train',
     templateUrl: 'juego-1-train.html',
})
export class Juego_1TrainPage {

     constructor(public navCtrl: NavController, public navParams: NavParams, public pruebaProvider: PruebaProvider, public alertCtrl: AlertController) {
          info.prueba = this.pruebaProvider;
          info.nav = this.navCtrl;
          info.numero = 0;
          info.x = [];
          info.y=0;
          info.z=0;
     }

     ionViewDidLoad() {


          $('#y').attr("style", "display:none");
          $('#x').attr("style", "display:none");
          info.arriba = [["círculo", "red"], ["gato", "blue"], ["ocho", "yellow"],
                         ["azul", "red"], ["rojo", "blue"]];

          info.abajo = [["azul", "yellow"], ["azul", "green"], ["amarillo", "blue"],
                        ["rojo", "yellow"], ["amarillo", "red"]];

          info.res = ["nob", "sib", "sib",
                      "sib", "nob"];

          $('#color1').text(info.arriba[0][0]);
          $('#color1').css("color", info.arriba[0][1]);
          $('#color2').text(info.abajo[0][0]);
          $('#color2').css("color", info.abajo[0][1]);
          var texto = "¿La palabra de arriba: '" + info.arriba[info.numero][0] + "' está escrita con el nombre del color escrito abajo: '" + info.abajo[info.numero][0] + "' ?";
          $('#texto').text(texto);

          $('#botones').on('click', '.botoncitos', function () {

               var ide = $(this).attr('id');
               console.log(ide);
               if (ide == info.res[info.numero]) {
                    info.y++;
                    info.x[info.numero]="1";

                    $('#x').attr("style", "display:inline-flex");
                    setTimeout(function () {
                         $('#x').attr("style", "display:none");
                    }, 500);
               } else {
                    info.x[info.numero]="0";
                    $('#y').attr("style", "display:inline-flex");
                    setTimeout(function () {
                         $('#y').attr("style", "display:none");
                    }, 500);
               }
               info.numero++;
               if (info.numero == 5) {
                    if (info.y < 4) {
                         swal({
                              allowEscapeKey: false,
                              allowOutsideClick: false,
                              title: 'Vuelve a intentarlo!',
                              type: 'warning',
                              confirmButtonColor: '#f67b18',
                              confirmButtonText: 'De nuevo'
                         }).then(info.juju);

                         info.numero = 0;
                         $('#color1').text(info.arriba[0][0]);
                         $('#color1').css("color", info.arriba[0][1]);
                         $('#color2').text(info.abajo[0][0]);
                         $('#color2').css("color", info.abajo[0][1]);
                         var texto = "¿La palabra de arriba: '" + info.arriba[info.numero][0] + "' está escrita con el nombre del color escrito abajo: '" + info.abajo[info.numero][0] + "' ?";
                         $('#texto').text(texto);
                         info.z++;
                    } else {
                         swal({
                              allowEscapeKey: false,
                              allowOutsideClick: false,
                              title: 'Felicidades, completaste el entrenamiento!',
                              type: 'success',
                              confirmButtonColor: '#f67b18',
                              confirmButtonText: 'Realizar Prueba'
                         }).then(info.juju);
                    }

               } else {
                    var texto2 = "¿La palabra de arriba: '" + info.arriba[info.numero][0] + "' está escrita con el nombre del color escrito abajo: '" + info.abajo[info.numero][0] + "' ?";
                    $('#texto').text(texto2);

                    $('#color1').text(info.arriba[info.numero][0]);
                    $('#color1').css("color", info.arriba[info.numero][1]);
                    $('#color2').text(info.abajo[info.numero][0]);
                    $('#color2').css("color", info.abajo[info.numero][1]);
               }

          });
     }

}
