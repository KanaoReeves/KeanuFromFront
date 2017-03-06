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
  public data = { title: '', menuItem : {name: '', price: 0}}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  } 

  launchSubMenuPage(type: string){
    
    let starterExample = {
      name : 'Cheddar Soup',
      price : 7.99
    } 

    let saladExample = {
      name : 'Spinach Salad',
      price : 11.99
    } 

    switch (type){
      
      case 'Starters' : 
        this.data = {
        title : type,
        menuItem : starterExample
      }; break;

      case 'Salads' : 
        this.data = {
        title : type,
        menuItem : saladExample
      }; break;
    }

    this.navCtrl.push(this.SubMenuPage, this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
