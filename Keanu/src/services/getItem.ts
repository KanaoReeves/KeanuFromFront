import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ItemService {
    public menuItem: {_id: String, calories: Number, category: String, description: String, imageURL: String, name: String, price: any, tags: Array<String>}
    public orderItem: { name: String,  price: any, imageURL: String, quantity: Number }

    constructor(private http: Http) {
        this.orderItem = {name: "", price: 0, imageURL: "", quantity: 0}
    }

    public GetItem(id, quantity) {
        return new Promise<Object>((resolve, reject) => {
            let menu = this.http.get(`https://keanubackend.herokuapp.com/item/id/${id}`).map(res => res.json()).subscribe(
                data => {
                    this.menuItem = data.data.item;
                    this.orderItem.name = this.menuItem.name;
                    this.orderItem.price = this.menuItem.price * quantity;
                    this.orderItem.imageURL = this.menuItem.imageURL;
                    this.orderItem.quantity = quantity;
                    alert(this.orderItem.price);
                },
                err => {
                    console.log("Oops!");
                    reject(null)
                },
                () => {
                    resolve(this.orderItem);
                }
            );
        })

        //console.log("From GetMenu.ts " + this.menuItems);
    }
}