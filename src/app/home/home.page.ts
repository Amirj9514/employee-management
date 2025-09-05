import { Component } from '@angular/core';
import { IonHeader, IonContent, IonMenuButton } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { NavController } from '@ionic/angular';
import { SharedService } from '../Shared/shared.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonContent, SvgDirective, IonMenuButton],
})
export class HomePage {
  localStorageData: any;
  userData:any;
  constructor(private navCtrl: NavController , private sharedS:SharedService) {}

  ionViewWillEnter() {
    this.getLocalStorageData();
  }

  redirect(path: string) {
    this.navCtrl.navigateForward(path);
  }

  getLocalStorageData() {
    this.sharedS.getData().pipe(take(1)).subscribe((res:any)=>{
      this.localStorageData = res;
      this.userData = this.localStorageData.userData;
      
    })
  }
}
