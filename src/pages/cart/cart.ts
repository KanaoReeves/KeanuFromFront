import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';
import { OrderPage } from '../order/order'
import { Observable } from "rxjs/Observable";
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
  public cartItemsIncrease: Map<String, number>;
  public cartItems: Array<Object>
  public delivery: boolean;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private cartService: CartService) {
      this.cartItemsIncrease = new Map<String, number>();
      this.cartItems=new Array<Object>();
      this.delivery = false;
    }

  public GoOrderPage(){
    
    this.navCtrl.push(OrderPage);
  }

  public IncreaseQuantity(itemId: String): void{
    console.log('itemID is : ' + itemId);

    this.cartService.increaseQuantity({ 'id': itemId, 'quantity': 1 })
  }

  public DecreaseQuantity(itemId: String){
     this.cartService.increaseQuantity({ 'id': itemId, 'quantity': 1 })
  }

  ionViewDidLoad() {

    console.log('in cart loading');
    
    this.cartService.getCartItems().then(itemsData =>{
      this.cartItems = itemsData;     
      console.log(itemsData)
    })
  }
}

