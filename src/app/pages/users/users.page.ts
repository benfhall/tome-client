import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];

  constructor(private api: ApiService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?) {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      translucent: true,
      duration: 5000,
      cssClass: 'loading',
    });
    loading.present();

    this.api.getAllUsers().pipe(
      tap(data => {
        this.users = data;
      }),
      finalize(() => {
        loading.dismiss();
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe();
  }

  signOut() {
    this.api.logout();
  }
}
