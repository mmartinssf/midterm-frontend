import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Services
import { Appusers } from '../../providers/appusers';
import { FactService } from '../../providers/fact-service';

//Pages
import { Home } from '../home/home';


@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})

export class Results {

  url1:any;
  energy1:any;
  name1:any;
  data:any;
  
  
  url = undefined
  energy = undefined
  name = undefined
  barcode = undefined
  
  miles = undefined
  calories = undefined
  total = 0
  
    

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: Appusers,
    public fService: FactService) {}
    

  ionViewDidLoad() {
    this.data = this.navParams.data;
    this.barcode = null;
    console.log('Hello ResultsPage Page');
    
    console.log(this.data.brands_tags[0]);
    console.log(this.data.image_front_url);
    console.log(this.data.nutriments.energy_serving);
    
    this.name = this.data.brands_tags[0];
    this.url = this.data.image_front_url;
    this.energy = this.data.nutriments.energy_serving;
    
    console.log('hello');
    
    this.miles = Math.round((( this.energy * 0.239) / (0.653 * 155)) * 100) / 100;
    this.calories = Math.floor( this.energy * 0.239 );
 
  }
  
  addMiles(){
    this.total += this.miles;
    return Math.floor(this.total);
  }
  
  
  resultsScan() {
      
    this.url = undefined;
    this.energy = undefined;
    this.name = undefined;
    console.log(this.url);
    
    this.fService.getData(this.barcode)
    .map(res => res.json())
    .subscribe(res => {
      this.data = res.product;
      this.barcode = null;
      
      
      this.url = this.data.image_front_url;
      this.energy = this.data.nutriments.energy;
      this.name = this.data.brands_tags[0];
      
       console.log(this.url);
       console.log(this.energy);
       console.log(this.name);
      
      if(this.data !== undefined) {
            if(this.data.image_front_url == undefined) {
                this.url = "";  
            } 
            if(this.data.nutriments.energy == undefined) {
                this.energy = ""; 
            } 
            if(this.data.brands_tags[0] == undefined) {
                this.name = ""; 
            } 
        }
        else {
            alert("WoW, You Tried Again.." );
        };
        
        this.calories = Math.floor( this.energy * 0.239 );
        this.miles = Math.round((( this.calories) / (0.653 * 155)) * 100) / 100;
        
    })
  }


}
