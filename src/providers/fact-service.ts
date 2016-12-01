import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()

export class FactService {
  
  ID = '7c77b2a6';
  Key = 'cb181045d0f32bf1c5f29dc71d02fc3d';
  login = 'mmartinssf';
  password = 'damien123';
  upc = '611269101713';
  url = 'https://api.foodfacts.com/ci/api/foodfacts/food_find_product_by_upc/format/json';
  data = undefined
  


  constructor(private http: Http) {
    console.log('Hello FactService Provider');
  }
  
  
  //OpenFoodFacts API
  getData(barCode) {
    console.log('http://world.openfoodfacts.org/api/v0/product/[' + barCode  + '].json');
    return this.http.get('http://world.openfoodfacts.org/api/v0/product/[' + barCode  + '].json');
  }
  
  //Nutritionix API
  getData1(barCode) {
    console.log('https://api.nutritionix.com/v1_1/item?upc=' + barCode  + '&appId=' + this.ID + '&appKey=' + this.Key);
    return this.http.get('https://api.nutritionix.com/v1_1/item?upc=' + barCode  + '&appId=' + this.ID + '&appKey=' + this.Key);
  }
  
  

}

