import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/Rx';
/*
  Class for the Login page.

*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private http: Http, private storage: Storage) {
    this.username='';
    this.password='';
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  public login():void{
    let headers = new Headers({ 'username': this.username, 'password': this.password });

    this.http.post("https://keanubackend.herokuapp.com/login", null,{ headers: headers })
        .subscribe(
            data => {
              console.log(data.json()['data']['token']);
              this.storage.set('token',data.json()['data']['token'])
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
