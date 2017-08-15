import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import { environment } from '../../environments/environment';

@Injectable()
export class StocksService {

  constructor(private http: Http) { }

  get1m(symbol: string) {
    return this.getDayInterval(symbol, '1m');
  }

  getDaily(symbol: string) {
    return this.getDayInterval(symbol, 'Daily');
  }

  private getDayInterval(symbol: string, interval: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('function', 'TIME_SERIES_DAILY');
    params.set('symbol', symbol);
     params.set('outputsize', 'full');
    params.set('interval', interval);
    params.set('apikey', environment.API_KEY);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.http.get('https://www.alphavantage.co/query', requestOptions)
    .first()
    .map(
      (res) => {
        const data = res.json();
        const meta = data['Meta Data'];
        const rawValues = data['Time Series (' + interval + ')'];
        const realValues = [];
        for (const key in rawValues) {
          if (rawValues.hasOwnProperty(key)) {
            realValues.unshift([Date.parse(key), +rawValues[key]['4. close']]);
          }
        }
        return realValues;
      }
    );
  }

}
