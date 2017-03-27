import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

// Keanu Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SubmenuPage } from '../pages/submenu/submenu';
import { RestaurantinfoPage } from '../pages/restaurantinfo/restaurantinfo';
import { AdminPage } from '../pages/admin/admin';
import { CartPage } from '../pages/cart/cart';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Setting the root page to HomePage
  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public storage: Storage) {
    this.initializeApp();

    // Title + Routes for the Menu
    this.pages = [
      { title: 'Home', component: HomePage }, // Added Home as the first menu option 
      //Restaurant infomation page
      { title: 'Restaurant Info', component: RestaurantinfoPage },
      // If Token exists, show logout
      { title: 'Cart', component: CartPage },
    ];

    // push admin page if user is an admin
    this.storage.get('adminRights').then((value: boolean)=>{
      this.pages.push({ title: 'Admin', component: AdminPage})
    })

    // if token is available show login page
    this.storage.get('token').then((value: string) => {
      if (value == null || value == "") {
        this.pages.push({ title: 'Login', component: LoginPage });
      }
      else {
        this.pages.push({ title: 'Logout', component: LoginPage });
      }
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    if (page.title == "Logout") {
      alert("You have successfully logged out")
      this.storage.remove('token')
      this.pages.pop();
      this.pages.push({ title: 'Login', component: LoginPage })
      this.nav.setRoot(HomePage);
    }

    this.storage.get('token').then((value: string) => {
      if(value != "" && value != null){
        this.pages.pop();
        this.pages.push({ title: 'Logout', component: LoginPage })
      }
      this.nav.setRoot(page.component)
    });
  }
}
