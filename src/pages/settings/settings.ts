import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  
  user = {
    gender: '',
    pace: '',
    weight: ''
  }
  
  gender = 'Gender';

  constructor(
    public navCtrl: NavController,
    public storage: Storage) {}

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
    this.storage.get('gender').then((data) => {
      console.log(data);
      this.user.gender = data;
      console.log(this.user.gender);
    }),
    this.storage.get('pace').then((data) => {
      console.log(data);
      this.user.pace = data;
      console.log(this.user.pace);
    }),
    this.storage.get('weight').then((data) => {
      console.log(data);
      this.user.weight = data;
      console.log(this.user.weight);
    });
    console.log(this.user);
  }
  
  ionViewWillLeave() {
    console.log(this.user.gender);
    console.log(this.user.pace);
    console.log(this.user.weight);
    
    this.storage.set('gender', this.user.gender);
    this.storage.set('pace', this.user.pace);
    this.storage.set('weight', this.user.weight);
    
    // if(this.user.pace == 'run')
  }

}
