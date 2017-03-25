import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cartService';
import { Item } from '../../../models'


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
    private cartService: CartService
  ) {

    this.menuItems = this.navParams.get('data');
    this.storage.get('adminRights').then(value => {
      this.isAdmin = value
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
