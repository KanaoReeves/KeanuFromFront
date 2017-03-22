import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Item } from '../../models';
import { Storage } from '@ionic/storage';

@Injectable()
export class CartCallService {
    public cartItems: any;

    /**
     *
     * Creates an instance of CartCallService.
     * @param {Http} http 
     * @param {Storage} storage 
     * 
     * @memberOf CartCallService
     */
    constructor(private http: Http, public storage: Storage) {}

    /**
     * Get items in the cart
     * 
     * @param {any} _id 
     * @returns 
     * 
     * @memberOf CartCallService
     */
    public getCartItems() {
        let _id;
        this.storage.get('CartItem').then((value)=>{
            let cart = (value)        
        for (var i = 0, len = cart.length; i < len; i++){
            //_id = cart[i];
        return new Promise<Object>((resolve, reject) => {
            let menu = this.http.get(`https://keanubackend.herokuapp.com/item/id/${cart[i]}`).map(res => res.json()).subscribe(
                data => {
                    this.cartItems = data.data.items
                },
                err => {
                    console.log("Oops!");
                    reject(null)
                },
                () => {
                    resolve(this.cartItems);
                }
            );
        })
    }
})
    }
}
