import { Component, OnInit } from '@angular/core';
import { Bank } from './models/bank.model';
import { BankCardComponent } from './components/bank-card/bank-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [BankCardComponent, CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  currentYear: number;
  isLoading: boolean = true;
  selectedBank: Bank | null = null;

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

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    // Giả lập loading 2 giây
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  selectBank(bank: Bank) {
    console.log('Selecting bank:', bank);
    this.selectedBank = bank;
    console.log('Selected bank updated:', this.selectedBank);
  }
}