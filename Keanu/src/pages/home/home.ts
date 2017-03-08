import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string)=>{
      console.log(value)
    })
  }

}
