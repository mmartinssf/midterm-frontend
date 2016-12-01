import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Appusers } from '../../providers/appusers';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Appusers, Storage]
})

export class Login {
  
  user = {}

  constructor(
    public navCtrl: NavController,
    public appUser: Appusers,
    public storage: Storage) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }
  
  loginForm() {
    
    this.appUser.loginUser(this.user)
    .map(res => res.json())
    .subscribe(res => {
      this.storage.set('token', res.id);
      this.storage.set('userID', res.userId);
      this.navCtrl.setRoot(Home);
    },
      err => {
        alert(err);
    });
  }

}
