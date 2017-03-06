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

  public title: string;
  public menuItem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title='';
    this.menuItem = {name: '', price: 0};
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.menuItem = this.navParams.get('menuItem');;
    console.log(this.menuItem);
  }
}
