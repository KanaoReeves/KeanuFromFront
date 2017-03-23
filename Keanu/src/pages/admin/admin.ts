import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
    @ViewChild(Nav) nav: Nav;
    item: Array<{title: string, component: any}>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.item = [
    { title: 'Add Menu Item', component: AddItemPage }
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  itemSelected(item: string){
    console.log(item);
  }
    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page.component);
    this.navCtrl.push(page.component);
  }
}
