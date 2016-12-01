import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { Appusers } from '../../providers/appusers';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [Appusers]
})

export class Register {
  
  user = {
    firstName: '',
    lastName: '',
    weight: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              public appUser: Appusers,
              public storage: Storage,
              public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }
  
  isCompletedForm() {
    return this.user.email.indexOf('@') > 0 &&
      this.user.firstName && this.user.lastName && this.user.password;
  }

  registerForm() {
   
    this.appUser.registerUser(this.user)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      this.storage.set('token', res.token);
      this.storage.set('userID', res.id);
      this.navCtrl.setRoot(Home);
    },
      err => { 
        alert(err)
      });
  }
  

}


