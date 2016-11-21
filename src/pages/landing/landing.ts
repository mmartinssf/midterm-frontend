import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Register } from '../register/register';
import { Login } from '../login/login';


@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})

export class Landing {

  constructor(public navCtrl: NavController) {}
  
  

  ionViewDidLoad() {
    console.log('Hello LandingPage Page');
  }
  
  goToLogin() {
    this.navCtrl.push(Login);
  }
  
  goToRegister() {
    this.navCtrl.push(Register);
  }

}
