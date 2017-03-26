import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuCallService]
})
export class HomePage {
  public menuItems;
  public SubMenuPage = SubmenuPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private menuCall: MenuCallService,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    let loading: Loading = this.loadingCtrl.create({})
    loading.present()

    this.http.get('https://keanubackend.herokuapp.com')
      .subscribe(() => { }, () => { }, () => loading.dismiss())
  }

  public launchSubMenuPage(type: string): void {
    let loading: Loading = this.loadingCtrl.create({})
    loading.present();

    this.menuCall.getMenu(type).then((menuItems) => {
      console.log('###### From HOME START ######')
      console.log(menuItems)
      console.log('###### From HOME END ######')
      this.navCtrl.push(this.SubMenuPage, { data: menuItems }).then(() => loading.dismiss())
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string) => {
      console.log(value)
    })
  }
}
