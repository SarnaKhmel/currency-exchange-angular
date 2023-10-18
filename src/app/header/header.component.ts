import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @Input("usdRateNBU") usd! : string | undefined; 
  @Input("eurRateNBU") eur! : string | undefined; 

  selectedLanguage: string = 'en';
  
  constructor(private translate: TranslateService) {}
  
  changeLanguage() {
    this.translate.use(this.selectedLanguage);
  }
}
