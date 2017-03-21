import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { CartCallService } from '../../services/cartItems';
import { Item } from '../../../models'
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
  public cartItem: Object;
  private cartService: CartCallService;
  public itemsData: any;
  _cart = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    
      this.menuItems = this.navParams.get('data');
      console.log('###### From SUBMENU START ######')
      console.log(this.menuItems);
      console.log('###### From SUBMENU END ######') 
      this.itemsData={
        name: '',
        description: '',
        price: ''
      }
  }
  
  ionViewDidLoad() {

  }
  public addItem($event, item: Item) : void{
    this._cart.push(item._id);
    console.log(this._cart);     
    //console.log(this._cart);    
    this.storage.set('CartItem', JSON.stringify(this._cart));
    this.storage.get('CartItem').then((value)=>{
    //console.log(value);
    })
  }
  
}
