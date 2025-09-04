import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonButtons, IonButton, IonFooter } from '@ionic/angular/standalone';
import { CustomToastComponent } from "./Shared/Components/custom-toast/custom-toast.component";
import { SvgDirective } from "./Shared/directives/svg.directive";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CustomToastComponent, IonMenu, IonHeader, IonToolbar, IonContent, SvgDirective, IonFooter],
})
export class AppComponent {
  constructor() {}
}
