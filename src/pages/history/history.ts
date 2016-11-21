import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Appusers } from '../../providers/appusers';

//Pages
import { Results } from '../results/results';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class History {
  
  results = []


  constructor(
    public navCtrl: NavController,
    public appUsers: Appusers) {
      
    this.results = appUsers.grabHistoryResults();
    console.log('Results: ' + this.results);

  }

  ionViewDidLoad() {
    console.log('Hello History Page');
  }
  
  accessResult(id) {
    this.appUsers.loadAnswer(this.results[id]);
    this.navCtrl.push(Results);
  }
  
  

}
