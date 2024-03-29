import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  };
 
  constructor(
    private api: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}
 
  ngOnInit() { }
 
  async register() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      translucent: true,
      duration: 5000,
      cssClass: 'loading',
    });
    loading.present();

    this.api.register(this.credentials).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/tutorial');
      }  
    }, async err => {
      const alert = await this.alertCtrl.create({
        header: 'Registration failed',
        message: err.error['msg'],
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
