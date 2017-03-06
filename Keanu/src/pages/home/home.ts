import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';

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

  SubMenuPage = SubmenuPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  launchSubMenuPage(type: string){

    let data = {
      title : type,
    }

    this.navCtrl.push(this.SubMenuPage, data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
