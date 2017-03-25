import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cartService';
import { Item } from '../../../models';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html',
  providers: [CartService]
})
export class SubmenuPage {
  public menuItems: Object;
  public cartItem: Object;
  public isAdmin: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private cartService: CartService,
    private http: Http
  ) {

    this.menuItems = this.navParams.get('data');
    this.storage.get('adminRights').then(value => {
      this.isAdmin = value


    })
  }
  public deleteClick(id: String): void {
    let link = 'https://keanubackend.herokuapp.com/admin/item/delete/' + id;
    console.log(id);
    

    this.storage.get('token').then(value => {
      console.log(value);
      
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      
      this.http.post(link, '',options)
        .subscribe(
        data => { },
        err => {
          console.log('error')
          console.log(err);
        },
        () => { }
        )

    })

  }


  ionViewDidLoad() { }

  /**
   * Add item to cart
   * 
   * @param {Item} item 
   * 
   * @memberOf SubmenuPage
   */
  public addItem(itemId: String): void {
    console.log('itemID is : ' + itemId);

    this.cartService.addToCart({ 'id': itemId, 'quantity': 1 })
  }

}
