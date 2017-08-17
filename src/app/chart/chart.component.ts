import { Component, OnInit, OnDestroy } from '@angular/core';
import { StocksService } from '../stocks/stocks.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  options: Object;
  subs: Subscription[];
  chart;

  ngOnInit(): void {
    this.stock.getSymbols().subscribe(
      (stocks) => {
        if (!stocks) {
          return;
        }
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(true);
        }
        stocks.forEach(stock => {
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
          this.subs.push(sub);
          this.chart.redraw();
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  saveInstance(chartInstance): void {
      this.chart = chartInstance;
  }

  constructor(private stock: StocksService) {
    this.subs = [];
      this.options = {
          title : { text : null },
          series : [],
          chart: {
            backgroundColor: '#333',
            color: '#fff',
            fill: '#fff',
            style: {
              'color': '#fff'
            },
          },
          colors: ['#c8aef7', '#25bb42', '#da08e0', '#f65e89', '#63680e', '#5aff4d',
          '#62bf10', '#80de07', '#d829ba', '#9adae4', '#0cf38c', '#a48a54', '#738538',
          '#d16e8a', '#f6d15c', '#b4fc47', '#8b6e0d', '#110f2f', '#0b0f8a', '#2c35ea',
          '#f38265', '#250b72', '#fc0591', '#ed3bf1', '#5e6068', '#a16b48', '#c38b69',
          '#adcd6a', '#28af1e', '#8edf79', '#b996c1', '#d72121'],
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
