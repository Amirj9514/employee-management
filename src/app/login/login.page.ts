import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SharedService } from '../Shared/shared.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ShowToastService } from '../Shared/show-toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ProgressSpinnerModule],
})
export class LoginPage implements OnInit {
  activeStep: 'id' | 'pass' = 'id';
  userId: string = '';
  password: string = '';
  mainLoader: boolean = false;

  constructor(
    private sharedS: SharedService,
    private showToastS: ShowToastService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  changeStep(step: 'id' | 'pass') {
    this.activeStep = step;
  }

  addDigit(num: number) {
    if(this.mainLoader) return;
    if (this.activeStep === 'id') {
      this.userId += num.toString();
    } else {
      this.password += num.toString();
    }
  }

  removeAll() {
     if(this.mainLoader) return;
    if (this.activeStep === 'id') {
      this.userId = '';
    } else {
      this.password = '';
    }
  }

  removeDigit() {
     if(this.mainLoader) return;
    if (this.activeStep === 'id') {
      this.userId = this.userId.slice(0, -1);
    } else {
      this.password = this.password.slice(0, -1);
    }
  }

  callApiLogin() {
     if(this.mainLoader) return;
    if (!this.userId) {
      this.showToastS.setToast({
        show: true,
        message: 'Please Enter Your User ID',
      });
      return;
    }

    if (this.activeStep === 'pass') {
      if (!this.password) {
        this.showToastS.setToast({
          show: true,
          message: 'Please Enter Your Password',
        });
        return;
      }
    }

    const apiParam = {
      username: this.userId ?? '',
      password: this.password ?? '',
      business_type: 'restaurant',
    };
    this.mainLoader = true;
    this.sharedS
      .sendPostRequest('Business_controller/app_login', apiParam)
      .subscribe({
        next: (res: any) => {
          this.mainLoader = false;
          if (res?.status === 'false') {
            this.showToastS.setToast({
              show: true,
              message:
                this.activeStep === 'pass'
                  ? 'Invalid Password'
                  : 'Please Enter Your Password',
            });
            this.activeStep = 'pass';
            return;
          } else if (res.status === 'true') {
            this.showToastS.setToast({
              show: true,
              message: 'Login successful!',
            });
            console.log('Login response:', res);
            
            this.sharedS.insertData({ key: 'userData', val: res });
            this.navCtrl.navigateRoot('/home');
          } else {
            this.showToastS.setToast({
              show: true,
              message: 'Login failed!',
            });
          }
        },
        error: (err: any) => {
          this.mainLoader = false;
          this.showToastS.setToast({
            show: true,
            message: 'Something Went Wrong!',
          });
          console.error('Login error:', err);
        },
      });
  }

  cancelLogin() {
     if(this.mainLoader) return;
    if (this.activeStep === 'id') {
      this.userId = '';
      return;
    }
    this.activeStep = 'id';
    this.password = '';
  }
}
