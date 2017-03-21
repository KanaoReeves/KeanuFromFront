import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


// Keanu Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SubmenuPage } from '../pages/submenu/submenu';
import { CartPage } from '../pages/cart/cart';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Setting the root page to HomePage
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // Title + Routes for the Menu
    this.pages = [
      { title: 'Home', component: HomePage }, // Added Home as the first menu option 
      // If no token exists, show login
      { title: 'Login', component: LoginPage },
      // If Token exists, show logout
      { title: 'Cart', component: CartPage }
    ];
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
