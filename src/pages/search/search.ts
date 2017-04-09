import { Component } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private _searchUrl: string;
  public results: Array<Object>;

  constructor(private http: Http) {
    this._searchUrl = 'https://keanubackend.herokuapp.com/item/search?q=';
    this.results = new Array<Object>();
  }

  /**
   * load page function
   */
  public ionViewDidLoad(): void {
    console.log('ionViewDidLoad SearchPage');
  }

  /**
   * get items 
   * @param event 
   */
  public getItems(event): void {
    let query = event.target.value

    if (query !== '') {

      this.http.get(this._searchUrl + query).map(res => res.json()).subscribe(
        data => {
          if (typeof data['data']['items'] !== 'undefined') {
            this.results = data['data']['items'];
            console.log(this.results);
            
          }
        },
        err => console.log(err),
        () => { }
      )
    }
  }

  /**
   * addToCart
   */
  public addToCart(id: string) {
    console.log('ID is ' + id);

  }

}
