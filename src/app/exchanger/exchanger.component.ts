import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css']
})
export class ExchangerComponent {
  @Input("allData") allData : any; 
}
