import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['brent@test.com', [Validators.required, Validators.email]],
      password: ['Welcome01!', [Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss(); 
        if (res.status === 'success') {       
          console.log('success')
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          console.log('error')
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: res.message,
            buttons: ['OK'],
          });
  
          await alert.present();
        }
      }
    );
  }

  // async login() {
  //   // const loading = await this.loadingController.create();
  //   // await loading.present();

  //   this.authService.login(this.credentials.value).then(async (result) => {
  //     this.router.navigateByUrl('/tabs', { replaceUrl: true });
  //     // await loading.dismiss();
  //   }, async (err) => {
  //     // await loading.dismiss();
  //     const alert = await this.alertController.create({
  //       header: 'Login failed',
  //       message: err,
  //       buttons: ['OK'],
  //     });

  //     await alert.present();
  //   });
  // }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}