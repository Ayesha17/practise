import { Component } from '@angular/core';
import { NavController ,LoadingController } from 'ionic-angular';
import {AuthProvider } from '../../providers/auth/auth';
import {DashboardPage} from '../dashboard/dashboard';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData={"email":"","pwd":""};
  loader :any;
  responseData:any;
  url:string="";

  constructor(public navCtrl: NavController,public authservice: AuthProvider, public loadingCtrl: LoadingController) {

  }
  
  
  login():void{
    if(this.userData.email!=""&& this.userData.pwd!="" && this.url!=""){
      if(this.url=="Local"){
        this.url="http://192.168.1.19/bm_portal/WebService1.asmx/";
        console.log("local");
      }
else{
  this.url="http://ca.risknucleus.com/bm_portal/WebService1.asmx/";
  console.log("server");
}

      localStorage.setItem('url',this.url);
console.log(this.url);
      this.presentLoading();

  this.authservice.postData(this.userData,"login").then((result)=>{
  this.responseData=result;

  localStorage.setItem('userData',JSON.stringify(this.responseData));
if(this.responseData.success=="True"){  
  this.navCtrl.push(DashboardPage);
this.loader.dismiss();
}
 else
 {
  this.loader.dismiss();
  // this.toast.show(`Co `, '5000', 'bottom').subscribe(
  //   toast => {
  //   console.log(toast);
  //  }
  // );
  
   console.log("error");
 }

},(err)=>{


  //connectionn failed message
});
}
else{
  // this.toast.show(`Form Contains Error `, '5000', 'bottom').subscribe(
  //   toast => {
  //    console.log(toast);
  //   }
  // );
}

  }


  presentLoading():void{
 this. loader  = this.loadingCtrl.create({
    
    
    });
    this. loader.present();
  }
}
