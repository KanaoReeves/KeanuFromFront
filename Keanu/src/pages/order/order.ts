import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';
import { ItemService } from '../../services/getItem';

// I only post to the backend once the button is clicked on this page

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [CartService, ItemService]
})

export class OrderPage {
  public cartItems: Array<any>
  public cartItem: { itemId: String, quantity: Number }
  public orderItems: Array<any>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private cartService: CartService,
    private itemService: ItemService) {
    this.cartItems = new Array<any>()
    this.orderItems = new Array<any>()
  }

  public getItems

  ionViewDidLoad() {
    console.log('In Order Page');

    this.cartService.getCartAsObject().then(itemsData => {
      this.cartItems = itemsData;

      this.cartItems.forEach(element => {
        this.cartItem = element;
         this.itemService.GetItem(this.cartItem.itemId, this.cartItem.quantity).then((data) => {
            this.orderItems.push(data);
            console.log(this.orderItems);
         })

        /*
          this.orderItems.push(data)
          this.orderItem.push(", this.cartItem.quantity, )
            console.log(this.orderItems);
        })*/
      })
    })
  }
}
