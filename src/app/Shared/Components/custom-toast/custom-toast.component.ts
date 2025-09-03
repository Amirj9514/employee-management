import { Component, OnInit } from '@angular/core';
import { IonToast } from '@ionic/angular/standalone';
import { ShowToast, ShowToastService } from '../../show-toast.service';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss'],
  imports: [IonToast],
})
export class CustomToastComponent implements OnInit {
  isToastOpen: boolean = false;
  toastData: ShowToast | null = null;
  constructor(private showToastS: ShowToastService) {}

  ngOnInit() {
    this.getToastData();
  }
  getToastData() {
    this.showToastS.showToast().subscribe((data: ShowToast | null) => {
      this.toastData = data;
      if (this.toastData?.show) {
        this.setOpen(true);
      }
    });
  }

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
      handler: () => {},
    },
  ];
  setOpen(show: boolean) {
    this.isToastOpen = show;
  }
}
