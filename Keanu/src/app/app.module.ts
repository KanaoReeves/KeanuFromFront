import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { PaymentInfoPage } from '../pages/paymentInfo/paymentInfo';
import { CartPage } from '../pages/cart/cart';
import { SubmenuPage } from '../pages/submenu/submenu';
import { RestaurantinfoPage } from '../pages/restaurantinfo/restaurantinfo';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    PaymentInfoPage,
    SubmenuPage,
    RestaurantinfoPage,  
    CartPage


  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    HomePage,
    PaymentInfoPage,
    SubmenuPage,
    RestaurantinfoPage,
    CartPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
