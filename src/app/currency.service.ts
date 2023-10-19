import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyRate } from './models/currency-rate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<CurrencyRate[]> {
    return this.http.get<CurrencyRate[]>(this.apiUrl);
  }
}
