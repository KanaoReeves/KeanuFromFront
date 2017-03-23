import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService]
})
export class CartPage {
  public cartItems: Array<Object>
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private cartService: CartService) {
      this.cartItems=new Array<Object>();
    }

  ionViewDidLoad() {
<<<<<<< HEAD
    this.cartCall.getCartItems();
    //console.log(this.cartItems);
    //console.log(this.storage.get('cartItem'));
    //this.cartCall.getCartItems(this.storage.get('cartItem')).then((cartItems) => {
    this.storage.get('CartItem').then((value)=>{
    let cart = (value)        
        for (var i = 0, len = cart.length; i < len; i++){
            let _id = cart[i]
            let menu = this.http.get(`https://keanubackend.herokuapp.com/item/id/${cart[i]}`)
            console.log(_id);}
=======
    console.log('in cart loading');
    
    this.cartService.getCartItems().then(itemsData =>{
      this.cartItems = itemsData;     
>>>>>>> 022ef9e5708530a69ac35019362e382a8bd67365
    })
  }
}

