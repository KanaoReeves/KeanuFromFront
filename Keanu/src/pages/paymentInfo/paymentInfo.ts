import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DatePipe } from '@angular/common';
import { LoginPage } from '../login/login';
/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paymentInfo',
  templateUrl: 'paymentInfo.html'
})
export class PaymentInfoPage {
  //Info input on this page
  public address: any;
  public paymentInfo: any;
  public adminRights: boolean=false;
 //Info pushed from previous RegisterPage  
  public username: string;
  public password: string;
  public email: string;
  public DisplayName: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private http: Http, private alertCtrl: AlertController) {
    //Gets info from register page
    this.DisplayName=navParams.get('DisplayNameParam')    
    this.email=navParams.get('emailparam');
    this.username=navParams.get('usernameParam');
    this.password=navParams.get('passwordParam');
    console.log(this.DisplayName=navParams.get('DisplayNameParam'))   
    //Info from this page
    this.address={
      number: '',
      name: '',
      streetType: '',
      postalCode: '',
    }
    this.paymentInfo={
      name:'',
      cardType: '',
      num: '',
      expiry: '1/1/17 12:00:00 AM UTC'
    }          
  }       
    public Register():void{
      let link = 'https://keanubackend.herokuapp.com/login/register'
      let data = JSON.stringify({'username': this.username, 'password': this.password, 'displayName': this.DisplayName,
                                 'email': this.email, 'adminRights': this.adminRights, 'paymentInfo': this.paymentInfo,
                                 'address': this.address})
      this.http.post(link,data,null)
      .subscribe(
          data=>{
        
          }, 
          err => {
              console.log("ERROR!: ", err);
            },
            ()=>{
              console.log('posted registration done')
              this.alertCtrl.create({
                title: 'registration Successful',
                subTitle: 'Congratulations, redirecting to the login page',
                buttons: ['OK']
              }).present();
              this.navCtrl.setRoot(LoginPage);
            }
        );
  }      
}
  

