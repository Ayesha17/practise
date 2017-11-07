import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl="http://ca.risknucleus.com/bm_portal/WebService1.asmx/";

@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }
  postData(credentials,type){
    
        return new Promise((resolve,reject)=>{
      //    let headers= new Headers();
        if(!localStorage.getItem('url')){
          apiUrl=localStorage.getItem('url');
        }

        console.log(apiUrl);

        console.log(type);
    //      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers}).subscribe(res=>{
            this.http.get(apiUrl + type, {params:credentials}).subscribe(res=>{
              
            resolve(res.json());
          }),(err)=>{
            reject(err);
          }
        });
      }


    
    
}

