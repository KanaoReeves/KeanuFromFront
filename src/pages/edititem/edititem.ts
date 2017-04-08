import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html'
})
export class EdititemPage {


  public item: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('data')

    console.log(this.item);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }

}
