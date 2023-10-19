import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CurrencyRate } from '../models/currency-rate';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css']
})
export class ExchangerComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  currencyRates: { [key: string]: number } = {
    UAH: 1,
  };
  currencies: { [key: string]: string } = {};
  amountFrom: number = 0;
  amountTo: number = 0;
  selectedCurrencyFrom: string = "USD";
  selectedCurrencyTo: string = "UAH";

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadCurrencyData();
  }

  loadCurrencyData() {
    this.currencyService
      .getCurrencyRates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: CurrencyRate[]) => {
        this.processCurrencyData(data);
      });
  }

  processCurrencyData(data: CurrencyRate[]) {
    data.forEach((currency: CurrencyRate) => {
      this.currencyRates[currency.cc] = 1 / currency.rate;
      if (currency.cc !== "UAH" && currency.cc !== "USD" && currency.cc !== "EUR") {
        this.currencies[currency.cc] = currency.txt;
      }
    });
  }

  convertCurrency(isAmountToChanged: boolean = false) {
    if (isAmountToChanged) {
      const rateTo = this.currencyRates[this.selectedCurrencyTo];
      this.amountFrom = +((this.amountTo / rateTo) * this.currencyRates[this.selectedCurrencyFrom]).toFixed(2);
    } else {
      const rateFrom = this.currencyRates[this.selectedCurrencyFrom];
      const rateTo = this.currencyRates[this.selectedCurrencyTo];
      this.amountTo = +((this.amountFrom / rateFrom) * rateTo).toFixed(2);
    }
  }

  onCurrencyFromChange() {
    this.convertCurrency();
  }

  onCurrencyToChange() {
    this.convertCurrency(true);
  }

  roundInputToTwoDecimals(event: any): void {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }

  onInputFocus(event: any) {
    if (event.target.value === '0') {
      event.target.value = '';
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
