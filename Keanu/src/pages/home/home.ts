import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuCallService]
})
export class HomePage {
  public menuItems;
  public SubMenuPage = SubmenuPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private menuCall: MenuCallService) {

  }

  public launchSubMenuPage(type: string): void {

    this.menuCall.getMenu(type).then((menuItems) => {
      console.log('###### From HOME START ######')
      console.log(menuItems)
      console.log('###### From HOME END ######')  
      this.navCtrl.push(this.SubMenuPage, {data: menuItems});
    })

  }

  ionViewDidLoad() {

  }
}
