import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.page.html',
  styleUrls: ['./time-sheet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule , SvgDirective  ,ButtonModule]
})
export class TimeSheetPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
