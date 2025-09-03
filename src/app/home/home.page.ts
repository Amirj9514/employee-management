import { Component } from '@angular/core';
import { IonHeader,IonContent } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonContent , SvgDirective],
})
export class HomePage {
  constructor() {}
}
