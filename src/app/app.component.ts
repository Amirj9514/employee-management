import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader,IonMenuToggle, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonButtons, IonButton, IonFooter } from '@ionic/angular/standalone';
import { CustomToastComponent } from "./Shared/Components/custom-toast/custom-toast.component";
import { SvgDirective } from "./Shared/directives/svg.directive";
import { NavController } from '@ionic/angular';
import { SharedService } from './Shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp,IonMenuToggle, IonRouterOutlet, CustomToastComponent, IonMenu, IonHeader, IonToolbar, IonContent, SvgDirective, IonFooter],
})
export class AppComponent {
  constructor(private sharedS: SharedService ,private navCtrl: NavController) {}

  logoout(){
    this.sharedS.insertData({
      key:'userData',
      val:null
    })
    this.navCtrl.navigateRoot('login');
  }
}
