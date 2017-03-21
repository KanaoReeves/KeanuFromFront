import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartCallService } from '../../services/cartItems';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartCallService]
})
export class CartPage {
  public cartItems;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    private storage: Storage, 
    private cartCall: CartCallService) {}

  ionViewDidLoad() {
    //var test = JSON.parse(storage.get('CartItem'));
    //let obtainedItems_array = JSON.parse(this.storage.get('CartItem'));  
    //console.log(JSON.parse(obtainedItems_array));
    console.log(this.storage.get('cartItem'));
    this.cartCall.getCartItems(this.storage.get('cartItem')).then((cartItems) => {
    this.storage.get('CartItem').then((value)=>{
    console.log('CartItem');
    })
  })
}
}
  