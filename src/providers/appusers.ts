import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

//Pages
import { Results } from '../pages/results/results';


@Injectable()

export class Appusers {
  private url = 'https://ng2-backend-martinssf.c9users.io/api/APP_Users';
  
  userData = []
  

  constructor(private http: Http) {
    console.log('Hello Appusers Provider');
  }
  
  registerUser(data) {
    return this.http
    .post('https://ng2-backend-martinssf.c9users.io:8080/api/APP_Users', data);
  }
  
  loginUser(data) {
    return this.http
    .post('https://ng2-backend-martinssf.c9users.io:8080/api/APP_Users/login', data);
  }
  
  logoutUser(token) {
    let auth = new Headers();
    auth.append('Authorization', token);
    return this.http.post('https://ng2-backend-martinssf.c9users.io:8080/api/APP_Users/logout', {}, { headers: auth } );
  }
  
  saveTotal (token, total) {
    let auth = new Headers();
    auth.append('Authorization', token);
    return this.http.post('https://ng2-backend-martinssf.c9users.io/api/Running_Totals?access_token=' + token, total, { headers: auth } );
  }
  
  //Get user weight and daily total
  // accessUserValues(token, userID) {
  //   let auth = new Headers();
  //   auth.append('Authorization', token);
  //   //auth.append('Accept', 'application/json');
  //   // auth.append('Content-Type', 'application/json');
  //   return this.http.get('https://ng2-backend-martinssf.c9users.io/api/APP_Users?filter[where][userID]=' + userID);
  // }
  
  accessUserData(token,userID) {
    let auth = new Headers();
    auth.append('Authorization', token);
    return this.http.get(this.url + '?filter[where][userID]=' + userID);
  }
  
  


}
