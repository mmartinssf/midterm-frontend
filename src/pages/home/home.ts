import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


//Services
import { Appusers } from '../../providers/appusers';
import { FactService } from '../../providers/fact-service';
import { UserData } from '../../providers/user-data';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class Home {

  show = false
  barcode = undefined
  
  total = 0;
  calPerMile = undefined
  token = undefined
  userID = undefined
  date = undefined
  currentDate = undefined
  //weight = 0;
  user = {
    gender: '',
    pace: '',
    weight: 0
  }
  // userInfo = {
  //   firstName: '',
  //   lastName: '',
  //   weight: 0
  // }
  UserInfo = []
  
  //Nutrition Variables
  productData = undefined
  miles: number = 0;
  name = undefined
  servingSize: undefined
  servings = undefined
  serPerContainer = undefined
  calories = undefined
  totalCalories = undefined
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
  
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: Appusers,
    public fService: FactService,
    public storage: Storage,
    public dataService: UserData,
    public alertCtrl: AlertController) 
    {
      this.UserInfo = this.dataService.grabUserInfo();
      console.log('User Info:' + this.UserInfo);
    }  
  
  ionViewDidEnter() {
    console.log('Hello HomePage Page');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    
    //Assign settings from storage
    this.storage.get('token').then((data) => {
      console.log(data);
      this.token = data;
    }),
    this.storage.get('userID').then((data) => {
      console.log(data);
      this.userID = data;
    }),
    
    
    
    // this.storage.get('total').then((data) => {
    //   console.log(data);
    //   this.total = Math.round(data * 100) / 100;
    // }),
    // this.storage.get('gender').then((data) => {
    //   console.log(data);
    //   this.user.gender = data;
    //   console.log(this.user.gender);
    // }),
    // this.storage.get('pace').then((data) => {
    //   console.log(data);
    //   this.user.pace = data;
    //   console.log(this.user.pace);
    // }),
    // this.storage.get('weight').then((data) => {
    //   console.log(data);
    //   this.user.weight = data;
    //   console.log(this.user.weight);
    // });
    console.log(this.user);
  }
  
  getUserInfo() {
    this.dataService.accessUserInfo(this.token, this.userID)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      this.user = res;
      console.log(this.user);
      console.log(this.user.weight);
      // this.storage.set('weight', this.userData[0].weight);
      this.navCtrl.setRoot(Home);
    },
      err => {
        alert(err);
    });
  }
  
  //Returns current timestamp
  getDate() {
    return this.date = new Date();
  }
  
  //Alert user of result in miles
  showPrompt(name, miles) {
    
    let prompt = this.alertCtrl.create({
      title: name,
      message:  miles  + " Miles, Is It Worth It?",
      buttons: [
        {
          text: 'Nope',
          handler: data => {
            console.log('Nope Thanks clicked');
          }
        },
        {
          text: 'Yeah, it is!',
          handler: data => {
            this.total += Math.round(this.miles * 100) / 100;
            this.storage.set('total', Math.round(this.total * 100) / 100);
            console.log('Yeah clicked');
            console.log(this.total);
            //this.userService.saveTotal (this.token, this.total); 
          }
        }
      ]
    });
    prompt.present();
  }
  
  getCalPerMile() {
    if(this.user.weight == undefined) {
      this.user.weight = 150;
      }
      if(this.user.pace == 'walk') {
        this.calPerMile = 0.57 * this.user.weight;
        console.log(this.calPerMile);
      }
      else if(this.user.pace == 'run') {
        this.calPerMile = 0.72 * this.user.weight;
        console.log(this.calPerMile);
      }
      else {
        this.calPerMile = 0.65 * this.user.weight;
        console.log(this.calPerMile);
      }
    return Math.round(this.calPerMile);
  }
  
  // firstCall() {
  //   this.fService.getData(this.barcode)
  //   .map(res => res.json())
  //   .subscribe(res => {
  //     console.log(res.product);
  //     return res.product;
  //
  // }
  
  // secondCall() {
  //   this.fService.getData1(this.barcode)
  //   .map(res => res.json())
  //   .subscribe(res => {
  //     console.log(res.product);
  //     return res.product;
  // }
  
  scan() {

      this.fService.getData(this.barcode)
      .map(res => res.json())
      .subscribe(res => {
        this.productData = res.product;
        console.log(this.productData);

      if(this.productData !== undefined) {
        this.barcode = '';
        this.name = (!undefined) ? this.productData.product_name : this.productData.product_name_en;
        
        //Variables
        // this.servingSize = Math.round((this.productData.serving_size));
        // this.servings = Math.round(this.productData.serving_quantity);
        this.calories = Math.round(this.productData.nutriments.energy_value);
        // this.serPerContainer = Math.round((this.servings / this.servingSize ));
        this.serPerContainer = 2.5;
        this.totalCalories = Math.round(this.calories * this.serPerContainer);
        this.calFat = Math.round(this.productData.nutriments.fat_serving);
        this.totalFat = Math.round(this.productData.nutriments.fat_value);
        this.fatPercent = Math.round(this.productData.nutriments.fat_value);
        this.satFat = Math.round(this.productData.nutriments.fat_value);
        this.satFatPercent = Math.round(this.productData.nutriments.fat_value);
        this.transFat = Math.round(this.productData.nutriments.fat_value);
        this.cholesterol = Math.round(this.productData.nutriments.fat_value);
        this.cholesterolPercent = Math.round(this.productData.nutriments.fat_value);
        this.sodium = Math.round(this.productData.nutriments.sodium_value);
        this.sodiumPercent = Math.round(this.productData.nutriments.sodium);
        this.totalCarbs = Math.round(this.productData.nutriments.carbohydrates);
        this.totalCarbsPercent = Math.round(this.productData.nutriments.carbohydrates);
        this.fiber = Math.round(this.productData.nutriments.sodium_value);
        this.fiberPercent = Math.round(this.productData.nutriments.sodium_value);
        this.sugars = Math.round(this.productData.nutriments.sugars);
        this.protein = Math.round(this.productData.nutriments.proteins_value);
        
        this.miles = Math.round((this.totalCalories / this.getCalPerMile()) * 100) / 100;
        console.log(this.miles);
        this.show = true;
        
        this.showPrompt(this.name, this.miles);
      }  
      
    })
  }
  
 
}

