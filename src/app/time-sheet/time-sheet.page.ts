import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SharedService } from '../Shared/shared.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.page.html',
  styleUrls: ['./time-sheet.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    SvgDirective,
    ButtonModule,
    TableModule,
  ],
})
export class TimeSheetPage {
  currentTime = signal<string>('');
  activeTab: 'today' | 'weekly' | 'monthly' = 'weekly';
  localStorageData: any;
  timeSheetData: any[] = [];
  allTimeSheetData: any = null;
  

  constructor(public sharedS: SharedService) {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  ionViewWillEnter() {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
     this.sharedS.getData().pipe(take(1)).subscribe((res: any) => {
      this.localStorageData = res;
      this.getTimeSheetData();
    });
  }

  getTimeSheetData() {
    const apiParam = {
      business_id: this.localStorageData?.userData?.id,
      staff_id:1,
      //  this.localStorageData?.userData?.staff_id,
      week_no: 0,
      date: '-',
    };
    this.sharedS.sendPostRequest('reporting/getTimesheet', apiParam).subscribe({
      next: (res: any) => {
        if(res.success){
          this.timeSheetData = res.data ?? [];
          this.allTimeSheetData = res;
        }else{
          
        }
      },error: (err) => {
        console.error('Error fetching timesheet data:', err);
      }
    });
  }

  setActiveTab(tab: 'today' | 'weekly' | 'monthly') {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
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
}
