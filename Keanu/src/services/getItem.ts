import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ItemService {
    public menuItem: { _id: String, calories: Number, category: String, description: String, imageURL: String, name: String, price: any, tags: Array<String> }
    public orderItem: { name: String, price: any, imageURL: String, quantity: Number }
    public cartItem: Array<{ itemId: String, quantity: any }>
    public orderItems: Array<{ name: String, price: any, imageURL: String, quantity: Number }>

    constructor(private http: Http) {
        this.orderItem = { name: "", price: 0, imageURL: "", quantity: 0 }
        this.cartItem = new Array<any>()
        this.orderItems = new Array<any>()
    }

    public GetItem(cartItem) {
        return new Promise<Object>((resolve, reject) => {
            this.cartItem = cartItem
            //console.log(this.cartItem)
            let index : number = 0;
            this.cartItem.forEach(element => {
                //console.log(element.itemId)
                //console.log(element.quantity)
                let menu = this.http.get(`https://keanubackend.herokuapp.com/item/id/${element.itemId}`).
                    map(res => res.json()).subscribe(
                    data => {
                        index++;
                        this.orderItem = {'name': data.data.item.name, 'price': data.data.item.price * element.quantity, 'imageURL': data.data.item.imageURL, 'quantity': element.quantity}
                        //let orderItem = {'name': data.data.item.name, 'price': data.data.item.price * element.quantity, 'imageURL': data.data.item.imageURL, 'quantity': element.quantity}
                        
                        this.orderItems.push(this.orderItem);
                        
                    },
                    err => console.log(err),
                    () => {
                        if (index == this.cartItem.length){
                        resolve(this.orderItems)}
                    })

                //console.log(element._id)
                //console.log(element.quantity)
                /*this.http.get(`https://keanubackend.herokuapp.com/item/id/${element._id}`).map(res => res.json()).subscribe(
                    data => {
                        console.log(data);
                    }
                )*/
            });

            /*let menu = this.http.get(`https://keanubackend.herokuapp.com/item/id/${id}`).map(res => res.json()).subscribe(
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
                */() => {
                resolve(this.orderItems);
            }
            //);
        })

        //console.log("From GetMenu.ts " + this.menuItems);
    }
}