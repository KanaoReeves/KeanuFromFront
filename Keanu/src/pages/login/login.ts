import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/Rx';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private http: Http) {
    this.username='';
    this.password='';
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  public login():void{
    let headers = new Headers({ 'username': this.username, 'password': this.password });

    console.log({ headers: headers })
    this.http.post("https://keanubackend.herokuapp.com/login", null,{ headers: headers })
        .subscribe(
            data => {
              console.log(data);
            },
            err => {
              console.log("ERROR!: ", err);
            },
            ()=>{
              console.log('posted login done')
            }
        );
  }

}
