import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CartService {
	public cartItems: Map<String, number>;

	/**
	 *
	 * Creates an instance of CartCallService.
	 * @param {Http} http 
	 * @param {Storage} storage 
	 * 
	 * @memberOf CartCallService
	 */
	constructor(private http: Http, public storage: Storage) {
		this.cartItems = new Map<String, number>();
	}

	/**
	 * Adds and item to the cart
	 * @param cartItem 
	 */
	public addToCart(cartItem: Object): void {
		this.storage.get('cartItem').then(value => {
			//if null sets a new Map
			this.cartItems = this._nullCheck(value)
			// if an item is already in the cart
			// then increment the quantity
			let currentQuantity=1
			if(this.cartItems.has(cartItem['id'])){
				currentQuantity = this.cartItems.get(cartItem['id'])
				currentQuantity++;
			}
			// set the cart
			this.cartItems.set(cartItem['id'], currentQuantity)
			// store the cart
			this.storage.set('cartItem', this.cartItems)
		})
	}

	/**
	 * returns the items data in the cart
	 * 
	 * @returns {Promise<Array<Object>>} 
	 * 
	 * @memberOf CartService
	 */
	public getCartItems(): Promise<Array<Object>> {
		let cartItemsData = [];
		return new Promise<Array<Object>>((resolve, request) => {
			this.storage.get('cartItem').then(value => {

				this.cartItems = this._nullCheck(value)
				let index: number = 0;
				this.cartItems.forEach((quantity, itemId) => {

					this.http.get('https://keanubackend.herokuapp.com/item/id/' + itemId).map(res => res.json())
						.subscribe(
						data => {
							index++;

							cartItemsData.push({
								'item': data,
								'quantity': quantity
							})
						},
						err => console.log(err),
						() => {
							if (index == this.cartItems.size) {
								resolve(cartItemsData)
							}
						}
						)//subscribe
				})//cart items
			})//storage
		})//Observable


	}

	private _nullCheck(value){
		return value == null ? new Map<String, number>() : value;
	}
}
