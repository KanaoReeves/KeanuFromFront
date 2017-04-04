import { Component } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private _searchUrl:string;
  
  public results: Array<Object>;

  constructor(private http:Http) {
    this._searchUrl = 'https://keanubackend.herokuapp.com/item/search?q=';

    this.results = new Array<Object>();
  }

  public ionViewDidLoad():void {
    console.log('ionViewDidLoad SearchPage');
  }

  public getItems(event):void{
    let query = event.target.value
    this.http.get(this._searchUrl + query).map(res => res.json()['data']['items']).subscribe(
      data => {console.log(data); this.results=data}
      
    )

  }

}
