import { Component, OnInit, OnDestroy } from '@angular/core';
import { StocksService } from '../stocks.service';
import { Subscription } from 'rxjs/Subscription';
import { Stock } from '../stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  stocks: {}[];

  constructor(private stock: StocksService) { }

  ngOnInit() {
    this.subscription = this.stock.getStocks().valueChanges().subscribe(
      (stocks) => {
        this.stocks = stocks;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
