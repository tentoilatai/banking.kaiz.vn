import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bank } from '../../models/bank.model';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BankCardComponent implements OnInit {
  @Input() bank!: Bank;
  amount: number = 0;
  formattedAmount: string = '';
  qrCodeUrl: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  suggestedAmounts: number[] = [100000, 500000, 1000000, 5000000];

  ngOnInit() {
    this.generateQRCode();
  }

  formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/,/g, '');
    if (/[^0-9]/.test(rawValue)) {
      this.showError('Vui lòng chỉ nhập số!');
      return;
    }
    this.amount = rawValue ? parseInt(rawValue, 10) : 0;
    this.formattedAmount = this.amount ? this.formatNumber(this.amount) : '';
    input.value = this.formattedAmount;
  }

  selectSuggestedAmount(amount: number): void {
    this.amount = amount;
    this.formattedAmount = this.formatNumber(amount);
    this.generateQRCode();
  }

  async generateQRCode() {
    this.isLoading = true;
    const amount = this.amount || 0;
    
    try {
      if (this.bank.name === 'HSBC Viet Nam Bank') {
        await this.generateHSBCQR(amount);
      } else if (this.bank.name === 'Standard Chartered Bank') {
        await this.generateSCQR(amount);
      }
    } finally {
      this.isLoading = false;
    }
  }

  private async generateHSBCQR(amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/458761-204340533001-U0BRVZi.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      this.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating HSBC QR:', err);
      this.showError('Lỗi khi tạo mã QR HSBC');
    }
  }

  private async generateSCQR(amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/970410-88447347488-O6dovov.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      this.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating SC QR:', err);
      this.showError('Lỗi khi tạo mã QR Standard Chartered');
    }
  }

  async copyQRCode() {
    try {
      const response = await fetch(this.qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      this.showError('Đã sao chép mã QR!');
    } catch (err) {
      this.showError('Lỗi khi sao chép mã QR');
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.qrCodeUrl).then(() => {
      this.showError('Đã sao chép link mã QR!');
    }).catch(() => {
      this.showError('Lỗi khi sao chép link');
    });
  }

  async shareLink() {
    try {
      await navigator.share({
        title: 'Mã QR Chuyển Khoản',
        text: `Chuyển khoản đến ${this.bank.accountName} (${this.bank.name})`,
        url: this.qrCodeUrl
      });
    } catch (err) {
      this.showError('Lỗi khi chia sẻ link');
    }
  }

  async downloadQRCode() {
    try {
      const response = await fetch(this.qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Format: YYYYMMDDHHMMSS
      const fileName = `${this.bank.name}_${timestamp}.png`;
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      this.showError('Lỗi khi tải mã QR');
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);
  }
}