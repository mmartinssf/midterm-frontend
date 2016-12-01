import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

//Services
import { Appusers } from '../providers/appusers';
import { FactService } from '../providers/fact-service';
import { UserData } from '../providers/user-data';

//Pages
import { Home } from '../pages/home/home';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Settings } from '../pages/settings/settings';
import { Sample } from '../pages/sample/sample';
import { Logout } from '../pages/logout/logout';

const INJECTIONS = [
  MyApp,
  Home,
  Landing,
  Login,
  Register,
  Settings,
  Logout
  ]

@NgModule({
  declarations: [
    INJECTIONS  
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    INJECTIONS
  ],
  providers: [Appusers, FactService, UserData, Storage]
})
export class AppModule {}
