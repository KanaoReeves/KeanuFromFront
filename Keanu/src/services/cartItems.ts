import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Item } from '../../models';
import { Storage } from '@ionic/storage';

@Injectable()
export class CartCallService {
    public cartItems: any;

    constructor(private http: Http, public storage: Storage) {

}
    public getCartItems(_id) {
        return new Promise<Object>((resolve, reject) => {
        let menu = this.http.get(`https://keanubackend.herokuapp.com/item/_id/${_id}`).map(res => res.json()).subscribe(
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
}
