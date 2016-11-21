import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { Appusers } from '../providers/appusers';
import 'rxjs/add/operator/map';

//Pages
import { Landing } from '../pages/landing/landing';
import { Home } from '../pages/home/home';
import { History } from '../pages/history/history';
import { Profile } from '../pages/profile/profile';
import { Logout } from '../pages/logout/logout';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  token = undefined
  userID = undefined

  rootPage: any = Landing;

  pages: Array<{icon: string, title: string, component: any}>;
  accounts: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform,
              public storage: Storage,
              public appUser: Appusers) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'md-home', title: 'Home', component: Home },
      { icon: 'md-timer', title: 'History', component: History }
    ],
    this.accounts = [
      { icon: 'md-contact', title: 'Profile', component: Profile },
      { icon: 'md-log-out', title: 'Logout', component: Logout }
    ];

  }
  
  ionViewDidLoad() {
    console.log('Hello Landing Page');
    this.storage.get('token').then((data) => {
      console.log(data);
      this.token = data;
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  logout() {
    this.appUser.logoutUser(this.token)
    .subscribe(res => this.nav.setRoot(Landing));
  }
  
  
}
