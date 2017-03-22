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
    //this.cartCall.getCartItems().then(cartItems);
    //console.log(this.cartItems);
    //console.log(this.storage.get('cartItem'));
    //this.cartCall.getCartItems(this.storage.get('cartItem')).then((cartItems) => {
    this.storage.get('CartItem').then((value)=>{
    let cart = (value)        
        for (var i = 0, len = cart.length; i < len; i++){
            let _id = cart[i]
            console.log(_id);}
    })
  }
}

  