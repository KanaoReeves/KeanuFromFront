import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';

// I only post to the backend once the button is clicked on this page

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [CartService]
})
export class OrderPage {
  public cartItems: Object

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private cartService: CartService) {
  }

  ionViewDidLoad() {
    console.log('In Order Page');

    this.cartService.getCartAsObject().then(itemsData => {
      this.cartItems = itemsData;
      // Code can go in here

    })
  }
}
