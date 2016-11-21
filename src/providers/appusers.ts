import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

//Pages
import { Results } from '../pages/results/results';


@Injectable()

export class Appusers {
  
  //History Services
  results = []
  
  //Answer Services
  answers = {
    userID: 'string',
    calories: 'number',
    createDate: 'date'
  }
  
  choices = []

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
  
  //History Services
  accessHistory(token,userID) {
    let auth = new Headers();
    auth.append('Authorization', token);
    return this.http.get('https://ng2-backend-martinssf.c9users.io/api/Histories?filter[where][userID]=' + userID);
  }
  
  saveHistoryResults(data) {
    this.results = data.slice(0,data.length);
  }
  
  grabHistoryResults() {
    return this.results;
  }
  
  //Answer Services
  saveAnswer(id,choice) {
    this.choices[id-1] = choice;
    console.log(this.choices);
  }
  
  loadAnswer(results) {
    this.answers = results;
  }
  


}
