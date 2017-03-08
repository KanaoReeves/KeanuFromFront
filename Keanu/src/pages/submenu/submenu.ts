import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Submenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html'
})
export class SubmenuPage {
  public menuItems: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.menuItems = this.navParams.get('data');
      console.log('###### From SUBMENU START ######')
      console.log(this.menuItems);
      console.log('###### From SUBMENU END ######') 
  }
  
  ionViewDidLoad() {

  }
}
