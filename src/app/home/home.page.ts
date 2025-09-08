import { Component } from '@angular/core';
import { IonHeader, IonContent, IonMenuButton, IonModal, IonButton } from '@ionic/angular/standalone';
import { SvgDirective } from '../Shared/directives/svg.directive';
import { NavController } from '@ionic/angular';
import { SharedService } from '../Shared/shared.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonContent, SvgDirective, IonMenuButton, IonModal, IonButton,CommonModule],
})
export class HomePage {
  localStorageData: any;
  userData: any;

  showQrModal: boolean = false;

  showClockModal: boolean = false;
  clockDialogType: 'in' | 'out' | 'office' | null = null;

  constructor(private navCtrl: NavController, private sharedS: SharedService) {}

  ionViewWillEnter() {
    this.getLocalStorageData();
  }

  redirect(path: string) {
    this.navCtrl.navigateForward(path);
  }

  getLocalStorageData() {
    this.sharedS.getData().pipe(take(1)).subscribe((res: any) => {
      this.localStorageData = res;
      this.userData = this.localStorageData.userData;
    });
  }

  openQrDialog() {
    this.showQrModal = true;
  }

  closeQrDialog() {
    this.showQrModal = false;
  }

  openClockDialog(type: 'in' | 'out' | 'office') {
    this.clockDialogType = type;
    this.showClockModal = true;
  }

  closeClockDialog() {
    this.showClockModal = false;
    this.clockDialogType = null;
  }
}
