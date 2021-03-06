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
    HomePage
} from '../home/home';
import {
    AlertController
} from 'ionic-angular';

import {
    PruebaProvider
} from '../../providers/prueba/prueba';
/**
 * Generated class for the Juego_4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class DeviceInfo5 {
    enun = [];
    res = [];
    cat = [];
    numero = 0;
    y = false;
    x: any;
    now = 0;
    total = 0;
    bien = 0;
    perse = 0;
    perseCon = 0;
    noPerse = 0;
    categoriasCon = 0;
    categorias = 0;
    mal = 0;
    t: any;
    x2: any;
    prueba: PruebaProvider;
    nav: NavController;
    juju() {
        info.prueba.enviarPuntaje({
            estado: "completed",
            movTotales: info.x,
            duracionTotal: info.total,
            correctas: info.bien,
            errores: info.mal,
            categorias: info.categorias
        }, "wisconsin");
        info.nav.setRoot(HomePage);
    }

}

let info = new DeviceInfo5();

@IonicPage()
@Component({
    selector: 'page-juego-4',
    templateUrl: 'juego-4.html',
})
export class Juego_4Page {

    constructor(public navCtrl: NavController, public navParams: NavParams, public pruebaProvider: PruebaProvider, private alertCtrl: AlertController) {
        info.prueba = this.pruebaProvider;
        info.nav = this.navCtrl;
        info.bien = 0;
        info.mal = 0;
        info.total = 0;
        info.numero = 0;
        info.y = false;
        info.x = [];
        info.categorias=0;
info.categoriasCon=0;    }

    ionViewCanLeave() {
        if (info.numero == 70) {
            return true;
        } else {
            let alert = this.alertCtrl.create({
                title: 'Prueba en proceso',
                subTitle: 'Por favor, termine la prueba',
                buttons: ['Ok']
            });
            alert.present();

            return false;
        }
    }

    ionViewDidLeave() {

        clearInterval(info.t);
    }


    ionViewDidLoad() {
        swal({
            text: "¿Había realizado esta prueba/ejercicio antes?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ya la he realizado',
            cancelButtonText: 'No, no la he realizado'
        }).then((result) => {
            info.now = 0;
            info.total=0;
            if (result.value) {
                info.prueba.enviarAnteriormente("wisconsin", "si");
            } else {
                info.prueba.enviarAnteriormente("wisconsin", "no");
            }
        })

        this.setTimer();
        $('#y').attr("style", "display:none");
        $('#x').attr("style", "display:none");
        info.enun = ["redcross3", "redcross1", "redtriangle2", "redcross4", "bluetriangle1", "bluecross1", "yellowcross3", "redstar3", "bluecross3", "bluecircle1", "redcircle3",

                      "redcircle1", "bluecross4", "bluecircle4", "greentriangle3", "yellowcross2", "greenstar3", "yellowstar3", "yellowstar1", "bluetriangle3", "yellowstar2", "bluestar2",

                        "greencircle3", "greenstar4", "redstar2", "redstar1", "bluetriangle4", "yellowcircle2", "redcross3", "greencross1", "yellowcircle3", "redstar4", "bluetriangle2",

                       "yellowstar4", "bluecircle3", "yellowtriangle4", "greencross3", "greencircle1", "yellowcircle4", "greencross4", "bluestar4", "redtriangle3", "greentriangle1", "redtriangle4", "yellowcircle1", "bluecross3", "yellowcross4", "redtriangle1",

                       "greencircle2", "greencircle4", "greentriangle2", "redcircle4", "greenstar1", "bluecircle2", "greencross2", "yellowtriangle2", "yellowtriangle1", "yellowtriangle3", "greenstar2",

                       "bluestar1", "bluestar3", "redcircle2", "greentriangle4", "yellowstar1", "redcross4", "yellowcross3", "bluecircle4", "redtriangle3", "greentriangle2", "greencross2"];


        info.res = ["color1", "color1", "color1", "color1", "color4", "color4", "color3", "color1", "color4", "color4", "color1",

                     "color4", "color3", "color4", "color1", "color3", "color2", "color2", "color2", "color1", "color2", "color2",

                     "color3", "color4", "color2", "color1", "color4", "color2", "color3", "color1", "color3", "color4", "color2",

                      "color3", "color4", "color3", "color2", "color2", "color3", "color2", "color4", "color1", "color2", "color1", "color3", "color4", "color3", "color1",

                      "color4", "color4", "color1", "color4", "color2", "color4", "color3",
                      "color1", "color1", "color1", "color2",

                      "color1", "color3", "color2", "color4", "color1", "color4", "color3",
                      "color4", "color3", "color2", "color2"];

        info.cat = ["color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "color", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "forma", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad", "cantidad"];



        $('#figuraTest').attr("src", 'assets/imgs/Wisconsin/' + info.enun[0] + '.gif');
        $('#juego4').on('click', '.colors', function () {

            var ide = $(this).attr('id');

            if (ide == info.res[info.numero]) {
                if (info.numero == 0) {
                    info.categoriasCon++;
                } else if (info.cat[info.numero] == info.cat[info.numero - 1]) {
                    info.categoriasCon++;
                    if (info.categoriasCon == 8) {
                        info.categorias++;

                    info.categoriasCon = 0;
                    }
                }
                info.x[info.numero] = ["1", info.now, info.cat[info.numero]];

                info.bien++;
                $('#x').attr("style", "display:inline-flex");
                setTimeout(function () {
                    $('#x').attr("style", "display:none");
                    info.now = 0;
                }, 500);
            } else {

                if (info.numero == 0) {
                    info.noPerse++;
                } else if (info.cat[info.numero] != info.cat[info.numero - 1]) {
                    info.noPerse++;
                } else {
                    info.perseCon++;
                }

                info.x[info.numero] = ["0", info.now, info.cat[info.numero]];
                info.categoriasCon = 0;
                info.mal++;
                $('#y').attr("style", "display:inline-flex");
                setTimeout(function () {
                    $('#y').attr("style", "display:none");
                    info.now = 0;
                }, 500);

            }
            info.numero++;
            $('#figuraTest').attr("src", 'assets/imgs/Wisconsin/' + info.enun[info.numero] + '.gif');



            if (info.numero == 70) {
                console.log("categorias " + info.categorias + " no Perse " + info.noPerse + " perse " + info.perseCon + " total " + info.mal);
                clearInterval(info.t);
                swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'Felicidades, completaste la prueba!',
                    type: 'success',
                    confirmButtonColor: '#f67b18',
                    confirmButtonText: 'Siguiente Prueba'
                }).then(info.juju);

            }
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
