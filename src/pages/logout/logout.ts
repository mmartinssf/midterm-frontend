import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Services
import { Appusers } from '../../providers/appusers'

//Pages
import { Landing } from '../landing/landing';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})

export class Logout {
  
  token = undefined
  total = undefined
  date = undefined

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public appUser: Appusers) {}

  ionViewDidLoad() {
    console.log('Hello LogoutPage');
    
    this.date = this.getDate();
    console.log(this.date);
    this.storage.set('date', this.date);
    this.storage.set('total', 0);
    this.storage.set('gender', undefined);
    this.storage.set('pace', undefined);
    this.storage.set('weight', undefined);
    
    this.storage.get('token').then((data) => {
      console.log(data);
      this.token = data;
      this.appUser.logoutUser(this.token)
      .subscribe(res => {
        this.navCtrl.setRoot(Landing) });
    });
    // this.appUser.saveTotal(this.token, this.total);
    // this.appUser.logoutUser(this.token)
    // .subscribe(res => this.navCtrl.setRoot(Landing));
  }
  
  getDate() {
    return new Date();
  }
  
}
