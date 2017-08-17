import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpModule, JsonpModule } from '@angular/http';
import { StocksService } from './stocks/stocks.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { SearchComponent } from './search/search.component';
import { StockComponent } from './stocks/stock/stock.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

declare var require: any;

    export function highchartsFactory() {
      const hc = require('highcharts/highstock');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
    }

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SearchComponent,
    StockComponent,
    StockListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
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
