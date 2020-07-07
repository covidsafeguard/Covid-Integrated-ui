import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private nativeHttp: HTTP) { }

  getCovidStatistics() {
    let url = 'https://api.covidindiatracker.com/total.json';
    return this.http.get(url);
  }

  getNewsFeed() {
    let url = 'http://newsapi.org/v2/top-headlines?' +
      'country=in&' + 'q=covid&' + 'sortBy=popularity&' +
      'apiKey=c64088cc3ae54c8ab633c1b4b25e6871';
    return this.http.get(url);
  }

  getHelplineNumbers() {
    let url='https://covid-19india-api.herokuapp.com/v2.0/helpline_numbers';
    return this.http.get(url);
  }

  pushNotification() {
    const data = {
      'app_id': '269a78f2-a91c-40c4-becf-163c527c7169',
      'include_player_ids': ['fc737234-e378-47fe-94c2-a9e9a1421263', 'a26275e7-09c4-49d6-880d-5c683cf33d46'],
      'headings': { 'en': 'Covid Safeguard App' },
      'contents': { 'en': 'You came in contact with Covid +ve person' },
      'data': { 'task': 'Sent via push notification' }
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic MGE1OGNlYjgtNzRlMC00MmZhLTg1YzctY2Y2NzlkNzgzYWJl'
    });
    let options = { headers: headers };
    return this.nativeHttp.post('https://onesignal.com/api/v1/notifications', data, options);
  }
}
