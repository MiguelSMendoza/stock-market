import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { StocksService } from '../stocks/stocks.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  formatter = (x: {symbol: string}) => x.symbol;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.stock.getSymbol(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          })
        )
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)

  selectedItem(event) {
    event.preventDefault();
    this.stock.addSymbol(event.item).then(
      () => {
        this.toastr.success(event.item.symbol + ' was successfully added!', 'Success');
      }
    )
    .catch(
      (error) => {
        this.toastr.error(error.message, error.name);
      }
    )
    ;
  }

  constructor(private stock: StocksService, public toastr: ToastsManager) { }

  ngOnInit() {
  }

}
