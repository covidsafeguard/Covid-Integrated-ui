import { Component, OnInit } from '@angular/core';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UniqueDeviceID:string;
  mainForm: FormGroup;
  Data: any[] = []
  constructor(private uniqueDeviceID: UniqueDeviceID,private uid: Uid,private androidPermissions: AndroidPermissions,private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router) { 
   // this.getPermission();
  }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchUsers().subscribe(item => {
          this.Data = item
        })
      }
    });
  
    this.mainForm = this.formBuilder.group({
      macid: [''],
      username: [''],
      firstn1ame: [''],
      lastname: [''],
      phoneno: [''],
      age: [''],
      covidstat: [''],
      dod: ['']
   })
  }
  storeData() {
    this.db.addUser(
      this.mainForm.value.macid1,
      this.mainForm.value.username,
      this.mainForm.value.firstname,
      this.mainForm.value.lastname,
      this.mainForm.value.phoneno,
      this.mainForm.value.age,
      this.mainForm.value.covidstat,
      this.mainForm.value.dod
    ).then((res) => {
      this.mainForm.reset();
    })
  }
  /*getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.UniqueDeviceID = uuid;
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
  }


  getID_UID(type){
    if(type == "IMEI"){
      return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }


  getPermission(){
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if(res.hasPermission){
        
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          alert("Error! "+error);
        });
      }
    }).catch(error => {
      alert("Error! "+error);
    });
  }*/
}
