import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserData {
  private url ='https://ng2-backend-martinssf.c9users.io/api/Running_Totals';
  
  // userInfo = {
  //   firstName: '',
  //   lastName: '',
  //   weight: 0
  // }
  
  UserInfo = [
    { "distance": "number", 
      "gender": "string",
      "pace": "string",
      "weight": "number",
      "id": "string" }
  ];

  constructor(public http: Http) {
    console.log('Hello UserData Provider');
  }

  accessUserInfo(token,userID) {
    let auth = new Headers();
    auth.append('Accept', 'application/json');
    auth.append('Authorization', token);
    return this.http.get(this.url + '?filter[where][userID]=' + userID);
  }
  
  // saveUserInfo(data) {
  //   this.UserInfo = data.slice(0,data.length);
  // }
  
  grabUserInfo() {
    return this.UserInfo;
  }
  
  getUserInfo(token) {
    let auth = new Headers();
    auth.append('Authorization',token);
    return this.http.get(this.url,{ headers: auth });
  }
  
  saveUserInfo(token,info,userID) {
    console.log('Inside saveInfo ' + info);
    let auth = new Headers();
    auth.append('Authorization', token);
    return this.http.post(this.url, info, { headers: auth });
  }


}
