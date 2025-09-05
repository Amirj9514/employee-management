import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { SharedService } from '../Shared/shared.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule,SvgDirective]
})
export class NotificationPage implements OnInit {

    notifications = [
    { table: '01', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '02', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '03', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '04', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '05', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '06', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '07', section: 'Grand Budapest', date: 'July 12 12:06 PM' },
    { table: '08', section: 'Grand Budapest', date: 'July 12 12:06 PM' }
  ];

  constructor(public sharedS:SharedService) { }

  ngOnInit() {
  }

}
