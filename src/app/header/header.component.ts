import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @Input("usdRateNBU") usd! : string | undefined; 
  @Input("eurRateNBU") eur! : string | undefined; 
}
