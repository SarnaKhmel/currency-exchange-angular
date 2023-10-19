import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { LanguageService } from '../language.service';
import { CurrencyRate } from '../models/currency-rate';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  usdRate: number = 0;
  eurRate: number = 0;
  selectedLanguage: string = 'en';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private currencyService: CurrencyService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadCurrencyRates();
  }

  loadCurrencyRates() {
    this.currencyService
      .getCurrencyRates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: CurrencyRate[]) => {
        this.usdRate = this.findRate(data, 'USD');
        this.eurRate = this.findRate(data, 'EUR');
      });
  }

  findRate(data: CurrencyRate[], currencyCode: string): number {
    const currency = data.find((item) => item.cc === currencyCode);
    return currency ? currency.rate : 0;
  }

  changeLanguage() {
    this.languageService.setLanguage(this.selectedLanguage);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
