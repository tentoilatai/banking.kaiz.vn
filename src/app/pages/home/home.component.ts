import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  greeting = '';
  currentTime = '';
  private timeInterval?: number;

  ngOnInit() {
    this.updateGreeting();
    this.updateTime();
    this.timeInterval = window.setInterval(() => {
      this.updateTime();
      this.updateGreeting();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateGreeting() {
    const now = new Date();
    const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    const hour = gmt7Time.getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'おはようございます (Good Morning)';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'こんにちは (Good Afternoon)';
    } else {
      this.greeting = 'こんばんは (Good Evening)';
    }
  }

  private updateTime() {
    const now = new Date();
    const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    
    const hours = gmt7Time.getHours().toString().padStart(2, '0');
    const minutes = gmt7Time.getMinutes().toString().padStart(2, '0');
    const seconds = gmt7Time.getSeconds().toString().padStart(2, '0');
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateString = gmt7Time.toLocaleDateString('en-US', options);
    
    this.currentTime = `${hours}:${minutes}:${seconds} GMT+7 • ${dateString}`;
  }
}