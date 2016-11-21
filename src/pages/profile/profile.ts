import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class Profile {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

}
