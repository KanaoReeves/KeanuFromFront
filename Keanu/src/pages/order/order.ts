import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
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
  public orderItems: Array<{ name: String, price: any, imageURL: String, quantity: Number }>
  public totalPrice: { subTotal: number, tax: number; total: number }
  public paymentInformation: Object

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public request: RequestOptions,
    private storage: Storage,
    private cartService: CartService,
    private itemService: ItemService) {
    this.cartItems = new Array<any>()
    this.orderItems = new Array<any>()
    this.totalPrice = { subTotal: 0, tax: 0, total: 0 }
    this.paymentInformation = new Object
  }

  public GetPaymentInfo(): void {

    this.storage.get('token').then(value => {
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://keanubackend.herokuapp.com/customer/payment', options).map(res => res.json()).subscribe(
        data => {
          this.paymentInformation = data.data.paymentInfo;
          console.log(this.paymentInformation);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  public ConfirmOrder() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = day + ":" + month + ":" + year

    alert("Your order is on its way");
    let confirmOrder = {
      "date": newdate,
      "delivery": false,
      "items": this.orderItems,
      "price": this.totalPrice.total
    }

    this.storage.get('token').then(value => {

      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({
        headers: headers,
        body: JSON.stringify(confirmOrder)
      })

      this.http.get('https://keanubackend.herokuapp.com/order/add', options).map(res => res.json()).subscribe(
        data => {
          console.log(data);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  ionViewDidLoad() {
    console.log('In Order Page');

    this.cartService.getCartAsObject().then(itemsData => {
      this.cartItems = itemsData;

      // Now I'll want to pass in the cart into the method GetItem
      this.itemService.GetItem(this.cartItems).then((data) => {
        this.orderItems = data;

        // I can get the price and others inside a new method
        // Do this code refactor inside the next iteration

        // Create a http request with a header
        this.GetPaymentInfo();

        this.orderItems.forEach(element => {
          this.totalPrice.subTotal += element.price
        });

        this.totalPrice.tax = (this.totalPrice.subTotal * .13)
        this.totalPrice.total = (this.totalPrice.subTotal + this.totalPrice.tax)
      });
    })
  }
}
