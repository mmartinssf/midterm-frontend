import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()

export class FactService {


  constructor(private http: Http) {
    console.log('Hello FactService Provider');
  }
  
  getData(barCode) {
    console.log('http://world.openfoodfacts.org/api/v0/product/[' + barCode  + '].json');
    return this.http.get('http://world.openfoodfacts.org/api/v0/product/[' + barCode  + '].json');
  }

}

