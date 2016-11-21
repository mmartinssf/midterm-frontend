import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Appusers } from '../../providers/appusers';
import { FactService } from '../../providers/fact-service';
import { Results } from '../results/results';
import { Sample } from '../sample/sample';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class Home {

  barcode = undefined
  productData = undefined
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: Appusers,
    public fService: FactService) {}  
    
  
  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }
  
  
  scan() {
    
    console.log();
    
    this.fService.getData(this.barcode)
    .map(res => res.json())
    .subscribe(res => {
      this.productData = res.product;
      console.log(this.productData);
      
      if(this.productData !== undefined) {
        this.barcode = null;
        this.navCtrl.push(Results, this.productData);
      }
      else {
        this.barcode = null;
        alert('Nice Try, You Almost Got Me!');
      }
      // this.energy = res.product.nutriments.energy;
      // this.name = res.product.brands_tags[0];
      
      // console.log(this.urlVariable);
      // console.log(this.energy);
      // console.log(this.name);
      // this.navCtrl.push(Results, this.productData);
      
    })
  }
 
}

