import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Item } from '../../models';
import { Storage } from '@ionic/storage';

@Injectable()
export class CartCallService {
    private cart: Item[] = [];
    public menuItems: any;
 constructor(private http: Http, public storage: Storage) {

    }
    public getItems(category) {
        return new Promise<Object>((resolve, reject) => {
            let menu = this.storage.get('CartItem');
            menu(res => res.json()).subscribe(
                data => {
                    this.menuItems = data.data.items
                },
                err => {
                    console.log("Oops!");
                    reject(null)
                },
                () => {
                    resolve(this.menuItems);
                }
            );
        })

        //console.log("From GetMenu.ts " + this.menuItems);
    }
}
