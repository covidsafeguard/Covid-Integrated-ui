import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { File } from '@ionic-native/file/ngx';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
csvData: any[] = [];
headerRow: any[] = [];
i: number = 1;
usermac: string = 'sample';
  constructor(private http:HttpClient, private papa: Papa, private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions, private file: File, private plt: Platform) {
    
    this.getPermission();
    //this.usermac = (this.uid.MAC).toString();
    this.loadCSV();
   }
  
  getPermission(){
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if(res.hasPermission){
        
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
         
          
        }).catch(error => {
          alert("Error! "+error);
        });
      }
    }).catch(error => {
      alert("Error! "+error);
    });
  }
 

  private loadCSV(){
    this.http.get('./assets/profile.csv',{
      responseType : 'text'
    }).subscribe(
      data=>this.extractdata(data),
      err=> console.log('error: ', err)
    )
  }
  extractdata(res){
    let csvData = res || '';
    this.papa.parse(csvData, {
      complete: parsedData=>{
        console.log(parsedData);
        console.log(parsedData.data.splice(0,1));
        this.headerRow = parsedData.data.splice(0,1)[0];
        this.csvData = parsedData.data;
      }
    })
    this.usermac = this.uid.IMEI;
    if(this.usermac == 'sample')
      alert('IMEI NOT FOUND');
    for(var k = 0; k < 100; k++){
      if(this.csvData[k][0] == this.uid.MAC){
        alert('MAC FOUND');
        this.i = k;
      }
           
    }
  }
  changecovidstat(){
   if(this.csvData[this.i][6] == 'negative') {
   this.csvData[this.i][6] = 'positive';
   this.chandedod();
   this.exportcsv();
   alert('You have been declared COVID Positive');
   }
    else {
      this.csvData[this.i][6] = 'negative';
      this.chandedod();
      this.exportcsv();
      alert('You have been declared COVID Negative');
    }
  }
  chandedod(){
    if(this.csvData[this.i][6] == 'negative')
      this.csvData[this.i][7] = 'NIL';
    else{
      var d = new Date();
      this.csvData[this.i][7] = d.toString();
    }
  }
  exportcsv(){
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    console.log('csv: ', csv);
   if(this.plt.is('cordova')){
      this.file.writeExistingFile(this.file.applicationDirectory + 'public/assets/', 'profile.csv', csv).then(res => {
       alert('Updated'); 
     }).catch(err => {
       alert('err: ' + err);
     });
    }
  }
 ngOnInit() {
  }

}
