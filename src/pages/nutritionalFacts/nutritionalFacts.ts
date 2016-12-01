import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-nutritionalFacts',
  templateUrl: 'nutritionalFacts.html'
})

export class NutritionalFacts {
  
  //Variables
  servingSize = undefined
  servings = undefined
  calories = undefined
  calFat = undefined
  totalFat = undefined
  fatPercent = undefined
  satFat = undefined
  satFatPercent = undefined
  transFat = undefined
  cholesterol = undefined
  cholesterolPercent = undefined
  sodium = undefined
  sodiumPercent = undefined
  totalCarbs = undefined
  totalCarbsPercent = undefined
  fiber = undefined
  fiberPercent = undefined
  sugars = undefined
  protein = undefined

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NutritionalFactsPage Page');
  }

}
