import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'currency-exchange';
  usdRateNBU: string | undefined;
  eurRateNBU: string | undefined;

  allData: Observable<any[]> = new Observable<any[]>(); 

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.allData = this.http.get<any[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    this.allData.subscribe((data: any[]) => {
      data.forEach((currency: { cc: string; rate: { toString: () => string | undefined; }; }) => {
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






