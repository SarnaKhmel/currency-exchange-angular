import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'currency-exchange';
  usdRateNBU: string | undefined;
  eurRateNBU: string | undefined;

  allData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get<any[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').subscribe((data) => {
      this.allData = data;
      data.forEach(currency => {
        if (currency.cc === 'USD') {
          this.usdRateNBU = currency.rate.toString();
        }
        if (currency.cc === 'EUR') {
          this.eurRateNBU = currency.rate.toString();
        }
      });
    });


  }
}
