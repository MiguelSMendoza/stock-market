import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../stock.model';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @Input() stock;

  constructor(private stockService: StocksService) { }

  ngOnInit() {
  }

  onRemoveStock(key) {
    this.stockService.removeSymbol(key);
  }

}
