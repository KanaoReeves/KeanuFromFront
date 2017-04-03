import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CartService {
	public cartItems: Map<String, number>;
	private _cartName: string;

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
		this._cartName = 'cartItem';
	}

	/**
	 * Adds and item to the cart if an item
	 * is in a cart it will update the
	 * quantity of that item
	 * @param cartItem 
	 */
	public addToCart(cartItem: Object): void {
		this.storage.get(this._cartName).then(value => {
			//if null sets a new Map
			this.cartItems = this._nullCheck(value)
			// if an item is already in the cart
			// then increment the quantity
			let currentQuantity = 1
			if (this.cartItems.has(cartItem['id'])) {
				currentQuantity = this.cartItems.get(cartItem['id'])
				currentQuantity++;
			}
			// set the cart
			this.cartItems.set(cartItem['id'], currentQuantity)
			// store the cart
			this.storage.set(this._cartName, this.cartItems)
		})
	}

	/**
	 * Deletes an item from the cart using 
	 * using the item id
	 * 
	 * @param {string} itemID 
	 * 
	 * @memberOf CartService
	 */
	public deleteFromCart(itemID: string) {
		this.storage.get(this._cartName).then((cart: Map<String, number>) => {
			cart.delete(itemID)
			this.storage.set(this._cartName, cart)
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
			this.storage.get(this._cartName).then(value => {

				this.cartItems = this._nullCheck(value)
				let index: number = 0;
				this.cartItems.forEach((quantity, itemId) => {

					this.http.get('https://keanubackend.herokuapp.com/item/id/' + itemId).map(res => res.json())
						.subscribe(
						data => {
							index++;

							cartItemsData.push({
								'item': data.data.item,
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
	public increaseQuantity(cartItem: any) {
		this.storage.get(this._cartName).then(value => {
			//if null sets a new Map
			this.cartItems = this._nullCheck(value)
			// if an item is already in the cart
			// then increment the quantity	
			let currentQuantity = 1;

			if (this.cartItems.has(cartItem.item._id)){
				currentQuantity = this.cartItems.get(cartItem.item._id);
				currentQuantity++;	
			}
			// set the cart
			this.cartItems.set(cartItem.item._id, currentQuantity)

			// store the cart
			this.storage.set(this._cartName, this.cartItems)
		})
	}
	public decreaseQuantity(cartItem: any) {
		this.storage.get(this._cartName).then(value => {
			//if null sets a new Map
			this.cartItems = this._nullCheck(value)
			// if an item is already in the cart
			// then increment the quantity	
			let currentQuantity = 1;

			if (this.cartItems.has(cartItem.item._id)){
				currentQuantity = this.cartItems.get(cartItem.item._id);
				currentQuantity--;	
			}
			// set the cart
			this.cartItems.set(cartItem.item._id, currentQuantity)

			// store the cart
			this.storage.set(this._cartName, this.cartItems)
		})
	}

	/**
	 * returns an object that can easily converted
	 * to JSON. This is used for passing the cart
	 * object to the back end
	 * 
	 * @returns {Promise<Array<Object>>} 
	 * 
	 * @memberOf CartService
	 */
	public getCartAsObject(): Promise<Array<Object>> {

		return new Promise<Array<Object>>((resolve, reject) => {
			this.storage.get(this._cartName).then((cart: Map<String, number>) => {
				let cartObject = new Array<Object>();
				cart.forEach((value: number, key: string) => {
					cartObject.push({
						'itemId': key,
						'quantity': value
					})
				})//for each 

				resolve(cartObject);
			})
		})


	}

	private _nullCheck(value) {
		return value == null ? new Map<String, number>() : value;
	}

}

