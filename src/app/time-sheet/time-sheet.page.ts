import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.page.html',
  styleUrls: ['./time-sheet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, SvgDirective, ButtonModule, TableModule,]
})
export class TimeSheetPage implements OnInit {
  currentTime = signal<string>('');
  activeTab: string = 'today';
  todayData: any[] = [];
  weeklyData: any[] = [];
  monthlyData: any[] = [];
  products: any[] = [];

  constructor() {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  ngOnInit() {
    this.generateMockData();
    this.setActiveTab('today');
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'today') {
      this.products = this.todayData;
    } else if (tab === 'weekly') {
      this.products = this.weeklyData;
    } else if (tab === 'monthly') {
      this.products = this.monthlyData;
    }
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
    this.currentTime.set(`${formattedHours}:${formattedMinutes} ${ampm}`);
  }

  generateMockData() {
    const randomHours = () => Math.floor(Math.random() * 9) + 1;
    const randomClockIn = () => `${Math.floor(Math.random() * 4) + 8}:00 AM`;
    const randomClockOut = () => `${Math.floor(Math.random() * 4) + 4}:00 PM`;
    this.todayData = [
      {
        date: '2025-09-03',
        day: 'Wednesday',
        status: 'Present',
        clockIn: '09:30 AM',
        clockOut: '06:00 PM',
        hours: 8.5
      },
      { date: '2025-08-28', day: 'Thursday', status: 'Present', clockIn: randomClockIn(), clockOut: randomClockOut(), hours: randomHours() },
    ];
    this.weeklyData = [
      { date: '2025-08-28', day: 'Thursday', status: 'Present', clockIn: randomClockIn(), clockOut: randomClockOut(), hours: randomHours() },
      { date: '2025-08-29', day: 'Friday', status: 'Present', clockIn: randomClockIn(), clockOut: randomClockOut(), hours: randomHours() },
      { date: '2025-08-30', day: 'Saturday', status: 'Absent', clockIn: '-', clockOut: '-', hours: 0 },
      { date: '2025-09-01', day: 'Monday', status: 'Present', clockIn: randomClockIn(), clockOut: randomClockOut(), hours: randomHours() },
      { date: '2025-09-02', day: 'Tuesday', status: 'Present', clockIn: randomClockIn(), clockOut: randomClockOut(), hours: randomHours() },
      { date: '2025-09-03', day: 'Wednesday', status: 'Present', clockIn: '09:30 AM', clockOut: '06:00 PM', hours: 8.5 }
    ];
    this.monthlyData = Array.from({ length: 15 }, (_, i) => {
      const date = new Date(2025, 7, i + 1);
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        status: Math.random() > 0.2 ? 'Present' : 'Absent',
        clockIn: randomClockIn(),
        clockOut: randomClockOut(),
        hours: randomHours()
      };
    });
  }
}
