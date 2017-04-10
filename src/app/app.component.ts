import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

// Keanu Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SubmenuPage } from '../pages/submenu/submenu';
import { RestaurantinfoPage } from '../pages/restaurantinfo/restaurantinfo';
import { AdminPage } from '../pages/admin/admin';
import { CartPage } from '../pages/cart/cart';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html',
  providers: [OneSignal]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Setting the root page to HomePage
  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor
    (
    public platform: Platform,
    public storage: Storage,
    public oneSignal: OneSignal
    ) {
    this.initializeApp();

    // Title + Routes for the Menu
    this.pages = [
      { title: 'Home', component: HomePage }, // Added Home as the first menu option 
      { title: 'Profile', component: ProfilePage },
      //Restaurant infomation page
      { title: 'Restaurant Info', component: RestaurantinfoPage },
      // If Token exists, show logout
      { title: 'Cart', component: CartPage },
    ];

    // push admin page if user is an admin
    this.storage.get('adminRights').then((isAdmin: boolean) => {
      if (isAdmin) { this.pages.push({ title: 'Admin', component: AdminPage }) }
    })

    // if token is available show login page
    this.storage.get('token').then((value: string) => {
      if (value == null || value == "") {
        this.pages.push({ title: 'Login', component: LoginPage });
      }
      else {
        this.pages.push({ title: 'Logout', component: LoginPage });
      }
    });

    // Push notification service
    this.oneSignal.startInit('0c73a76c-be9a-4c17-ab9e-0ad31cbaa349', '1031321310203');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.setSubscription(true);
    this.oneSignal.handleNotificationReceived().subscribe(() => { });
    this.oneSignal.handleNotificationOpened().subscribe(() => { });
    this.oneSignal.endInit();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#165cd3');
      Splashscreen.hide();
    });
  }


  openPage(page) {
    if (page.title == "Logout") {
      alert("You have successfully logged out")
      this.storage.remove('token');
      this.storage.remove('cartItem');
      this.pages.pop();
      this.pages.push({ title: 'Login', component: LoginPage })
      this.nav.setRoot(HomePage);
    }

    this.storage.get('token').then((value: string) => {
      if (value != "" && value != null) {
        this.pages.pop();
        this.pages.push({ title: 'Logout', component: LoginPage })
      }
      this.nav.setRoot(page.component)
    });
  }
}
