import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CustomToastComponent } from "./Shared/Components/custom-toast/custom-toast.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CustomToastComponent],
})
export class AppComponent {
  constructor() {}
}
