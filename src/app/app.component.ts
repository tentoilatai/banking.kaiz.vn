import { Component } from '@angular/core';
import { Bank } from './models/bank.model';
import { BankCardComponent } from './components/bank-card/bank-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [BankCardComponent]
})
export class AppComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();  // Lấy năm hiện tại
  }

  banks: Bank[] = [
    {
      name: 'HSBC Viet Nam Bank',
      accountNumber: '2043 4053 3001',
      accountName: 'TRAN VIET TAI'
    },
    {
      name: 'Standard Chartered Bank',
      accountNumber: '8844 7347 488',
      accountName: 'TRAN VIET TAI'
    }
  ];
}