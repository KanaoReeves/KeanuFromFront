import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';
import { OrderPage } from '../order/order'
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

  public GoOrderPage(){
    console.log("Hello World");
    this.navCtrl.push(OrderPage);
  }

  public DeliveryType(){

  }

  ionViewDidLoad() {
    console.log('in cart loading');
    
    this.cartService.getCartItems().then(itemsData =>{
      this.cartItems = itemsData;     
      console.log(itemsData)
    })
  }
}

