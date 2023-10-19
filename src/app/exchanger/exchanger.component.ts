import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css']
})
export class ExchangerComponent implements OnInit {
  @Input("allData") allData: any;

  constructor() { }

  amountFrom: any|number;
  amountTo: any|number;
  selectedCurrencyFrom: string = 'USD';
  selectedCurrencyTo: string = 'UAH';

  currencyRates: { [key: string]: number } = {
    'UAH': 1,
  };
  currencies: { [key: string]: string } = {};

  convertCurrency(isAmountToChanged: boolean = false) {
    if (isAmountToChanged) {
      const rateTo = this.currencyRates[this.selectedCurrencyTo];
      this.amountFrom = +(this.amountTo / rateTo * this.currencyRates[this.selectedCurrencyFrom]).toFixed(2);
    } else {
      const rateFrom = this.currencyRates[this.selectedCurrencyFrom];
      const rateTo = this.currencyRates[this.selectedCurrencyTo];
      this.amountTo = +(this.amountFrom / rateFrom * rateTo).toFixed(2);
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

  ngOnInit() {
    this.allData.subscribe((data: any)  => {
      data.forEach((data: any) => {
        this.currencyRates[`${data.cc}`] = 1 / data.rate;
        if (data.cc !== 'UAH' && data.cc !== 'USD' && data.cc !== 'EUR') {
          this.currencies[`${data.cc}`] = data.txt;
        }
      });
    });
  }
}




