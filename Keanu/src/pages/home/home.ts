import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuCallService]
})
export class HomePage {
  public menuItems : any;
  public SubMenuPage = SubmenuPage;
  public dataPass = { title: '', menuItem : {name: '', price: 0}}

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private menuCall: MenuCallService) {

  }

  launchSubMenuPage(type: string){
    

    
    switch (type){
      case 'Starter' : 
      
        this.menuItems = this.menuCall.getMenu(type);

        ; break;

      case 'Salads' : 

      this.http.get('https://keanubackend.herokuapp.com/item/category/Salads').map(res => res.json()).subscribe(
        data => {
          this.menuItems = data.data.items
        },
        err => {
          console.log("Oops!");
        }
      );

        ; break;
    }

    console.log(this.menuItems);
    
    //this.navCtrl.push(this.SubMenuPage, this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
