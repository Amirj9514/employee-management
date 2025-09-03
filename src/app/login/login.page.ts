import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SharedService } from '../Shared/shared.service';
import { ShowToastService } from '../Shared/show-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  activeStep: 'id' | 'pass' = 'id';
  userId: string = '';
  password: string = '';

  constructor(private sharedS: SharedService , private showToastS: ShowToastService) {}

  ngOnInit() {}

  changeStep(step: 'id' | 'pass') {
    this.activeStep = step;
  }

  addDigit(num: number) {
    if (this.activeStep === 'id') {
      this.userId += num.toString();
    } else {
      this.password += num.toString();
    }
  }

  removeAll() {
    if (this.activeStep === 'id') {
      this.userId = '';
    } else {
      this.password = '';
    }
  }

  removeDigit() {
    if (this.activeStep === 'id') {
      this.userId = this.userId.slice(0, -1);
    } else {
      this.password = this.password.slice(0, -1);
    }
  }

  callApiLogin() {
    if (!this.userId) {
      return;
    }

    const apiParam = {
      username: this.userId ?? '',
      password: this.password ?? '',
      business_type: 'restaurant',
    };

    this.sharedS
      .sendPostRequest('Business_controller/app_login', apiParam)
      .subscribe({
        next: (res: any) => {
          if (res?.status === 'false') {
            
            this.showToastS.setToast({
              show: true,
              message: this.activeStep === 'pass' ? 'Invalid Password' : 'Please Enter Your Password',
            });
            this.activeStep = 'pass';
            return;
          } else if (res.status === 'true') {
            this.showToastS.setToast({
              show: true,
              message: 'Login successful!',
            });
          } else {
            this.showToastS.setToast({
              show: true,
              message: 'Login failed!',
            });
          }

        },
        error: (err: any) => {
          this.showToastS.setToast({
            show: true,
            message: 'Something Went Wrong!',
          });
          console.error('Login error:', err);
        },
      });
  }


  cancelLogin(){
     if(this.activeStep === 'id'){
      this.userId = ''
      return;
    }
    this.activeStep = 'id';
    this.password = '';

   
  }
}
