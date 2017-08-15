import { Component, OnInit, ViewChild, OnChanges, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { StocksService } from './stocks/stocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*
{
  name : '',
    data : realValues,
    tooltip: {
    valueDecimals: 2
    }
  }
*/
export class AppComponent implements OnInit  {
  stocks: string[];
  options: Object;
  subs: Subscription[];
  chart;
  ngOnInit(): void {
    this.stocks.forEach(
      (stock) => {
        const sub = this.stock.getDaily(stock).subscribe(
          (values) => {
            this.chart.addSeries(
              {
                name : stock,
                data : values,
                tooltip: {
                    valueDecimals: 2
                }
              }
            );
          }
        );
      }
    );
  }
  saveInstance(chartInstance): void {
      this.chart = chartInstance;
  }

  constructor(private http: Http, private stock: StocksService) {
    this.stocks = ['AAPL', 'GOOGL'];
      this.options = {
          title : { text : 'Stocks' },
          series : [],
          chart: {
            backgroundColor: '#333',
            color: '#fff',
            fill: '#fff',
            style: {
              'color': '#fff'
            },
          },
          colors: [
            'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige',
            'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown',
            'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson'],
          labels: {
            style: {
              'color': '#fff'
            }
          },
          rangeSelector: {
            buttons: [{
              type: 'week',
              count: 1,
              text: '1w'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'month',
              count: 6,
              text: '6m'
            }, {
              type: 'year',
              count: 1,
              text: '1y'
            }, {
              type: 'year',
              count: 5,
              text: '5y'
            }, {
              type: 'all',
              text: 'All'
            }]
        }
      };
    }
}
