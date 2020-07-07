import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Profiles } from './profiles';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  userList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,) {
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'positronx_db.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.storage = db;
            this.getFakeData();
        });
      });
     }
     dbState() {
      return this.isDbReady.asObservable();
    }
    fetchUsers(): Observable<Profiles[]> {
      return this.userList.asObservable();
    }
    getFakeData() {
      this.httpClient.get(
        '../../assets/seed.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getUsers();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    getUsers(){
      return this.storage.executeSql('SELECT * FROM profile', []).then(res => {
        let items: Profiles[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) { 
            items.push({ 
              macid: res.rows.item(i).macid,
              username: res.rows.item(i).username,  
              firstname: res.rows.item(i).firstname,
              lastname: res.rows.item(i).lastname,
              phoneno: res.rows.item(i).phoneno,
              age: res.rows.item(i).age,
              covidstat: res.rows.item(i).covidstat,
              dod: res.rows.item(i).dod

            });
          }
        }
        this.userList.next(items);
      });
    }
    addUser(macid,username,firstname,lastname,phoneno,age,covidstat,dod) {
      let data = [macid,username,firstname,lastname,phoneno,age,covidstat,dod];
      return this.storage.executeSql('INSERT INTO songtable (macid,username,firstname,lastname,phoneno,age,covidstat,dod) VALUES (?, ?)', data)
      .then(res => {
        this.getUsers();
      });
    }
    getUser(id): Promise<Profiles> {
      return this.storage.executeSql('SELECT * FROM profile WHERE macid = ?', [id]).then(res => { 
        return {
              macid: res.rows.item(0).macid,
              username: res.rows.item(0).username,  
              firstname: res.rows.item(0).firstname,
              lastname: res.rows.item(0).lastname,
              phoneno: res.rows.item(0).phoneno,
              age: res.rows.item(0).age,
              covidstat: res.rows.item(0).covidstat,
              dod: res.rows.item(0).dod
        }
      });
    }
    updateUser(id, song: Profiles) {
      let data = [song.covidstat, song.dod];
      return this.storage.executeSql(`UPDATE profile SET covidstat = ?, dod = ? WHERE macid = ${id}`, data)
      .then(data => {
        this.getUsers();
      })
    }

}
