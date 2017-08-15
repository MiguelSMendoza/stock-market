import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpModule } from '@angular/http';
import { StocksService } from './stocks/stocks.service';

declare var require: any;

    export function highchartsFactory() {
      const hc = require('highcharts/highstock');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
    }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    StocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
