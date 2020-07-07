import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../shared/services/app.service';
import { Subscription } from '../../../node_modules/rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  // News Obj
  articles: any[];
  result;
  newsSubscription: Subscription;
  statisticsSubscription: Subscription;

  constructor(private appService: AppService) { 
    

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.newsSubscription = this.appService.getNewsFeed().subscribe((data) => {
    //   this.articles = data['articles'];
    // });

    this.articles = [
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "hindustantimes.com | Edited by: Sparshita Saxena",
        "title": "Rajasthan crosses 20,000-mark, Delhi nears one lakh cases: Covid-19 state tally - Hindustan Times",
        "description": "India has reported a steep rise of 24,248 new cases of coronavirus in the last 24 hours, the Ministry of Health stated on Monday.",
        "url": "https://www.hindustantimes.com/india-news/rajasthan-crosses-20-000-mark-delhi-nears-one-lakh-cases-covid-19-state-tally/story-jXqs0DShEiZQ7Mfnm7y6DP.html",
        "urlToImage": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/07/06/Pictures/the-coronavirus-disease-covid-new-outbreak-delhi_2bbb1302-bf3a-11ea-b246-8f7a5e10b5dd.jpg",
        "publishedAt": "2020-07-06T07:33:00Z",
        "content": "India is now the third worst-affected country by the coronavirus pandemic after overtaking Russia on Sunday. The country has reported a steep rise of 24,248 new cases of coronavirus in the last 24 ho… [+3728 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "Reuters | Posted by: Alfea Jamal",
        "title": "Covid-19: Hundreds of scientists say coronavirus is airborne, ask WHO to revise recommendations - Hindustan Times",
        "description": "Hundreds of scientists say there is evidence that novel coronavirus in smaller particles in the air can infect people and are calling for the World Health Organization to revise recommendations, the New York Times reported.",
        "url": "https://www.hindustantimes.com/health/covid-19-hundreds-of-scientists-say-coronavirus-is-airborne-ask-who-to-revise-recommendations/story-f9WuZQWQtBJaSN8E1BdBCL.html",
        "urlToImage": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/07/06/Pictures/delhi-weather_08ef9236-bf57-11ea-b246-8f7a5e10b5dd.jpg",
        "publishedAt": "2020-07-06T07:14:25Z",
        "content": "Hundreds of scientists say there is evidence that novel coronavirus in smaller particles in the air can infect people and are calling for the World Health Organization to revise recommendations, the … [+1405 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "News18"
        },
        "author": "News18",
        "title": "Rahul Gandhi Says Covid-19, GST Will be Future Harvard Case Studies on Failure; BJP Chief JP Nadda Hits B... - News18",
        "description": "Notably, Gandhi's attack on the Centre came a day after India surpassed Russia to become the third worst-hit nation by the coronavirus pandemic.",
        "url": "https://www.news18.com/news/politics/rahul-gandhi-says-covid-19-gst-will-be-future-harvard-case-studies-on-failure-bjp-chief-jp-nadda-hits-back-2703025.html",
        "urlToImage": "https://images.news18.com/ibnlive/uploads/2020/03/Rahul-Gandhi1.jpg",
        "publishedAt": "2020-07-06T05:27:16Z",
        "content": "Congress leader Rahul Gandhi on Monday mounted an attack on the Centre over the increasing number of coronavirus cases, saying that the government's handling of the Covid-19 crisis would figure in th… [+2479 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "Yashwant Raj and Agencies",
        "title": "99% Covid-19 cases ‘totally harmless’, says Donald Trump - Hindustan Times",
        "description": "Many states broke records in new cases. In Texas for instance, 7,890 patients were hospitalised. Florida has reported a new record of 11,445 cases.",
        "url": "https://www.hindustantimes.com/world-news/99-virus-cases-totally-harmless-says-donald-trump/story-bRlU5DyWuszGMlaNwrfQKO.html",
        "urlToImage": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/07/06/Pictures/president-trump-speaks-during-fourth-celebration-white_5d55526e-bf31-11ea-b246-8f7a5e10b5dd.jpg",
        "publishedAt": "2020-07-06T02:44:36Z",
        "content": "President Donald Trump has claimed without evidence that 99% of Covid-19 cases in the country were “totally harmless,” as the 4th of July weekend to mark US Independence Day added to worries of furth… [+1644 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "NDTV News"
        },
        "author": null,
        "title": "Taj Mahal, Other Agra Monuments Won't Open Today, Order Cites Risk Of COVID-19 Spread - NDTV",
        "description": "The government has withdrawn a planned reopening of the Taj Mahal, citing the risk of new coronavirus infections spreading in Agra from visitors flocking to see the monument. Local authorities issued a new advisory late on Sunday ordering an extension of lock…",
        "url": "https://www.ndtv.com/india-news/taj-mahal-other-agra-monuments-wont-open-today-order-cites-risk-of-covid-19-spread-2257629",
        "urlToImage": "https://c.ndtvimg.com/2020-07/uvl12jco_taj-mahal-reuters_625x300_05_July_20.jpg",
        "publishedAt": "2020-07-06T02:19:33Z",
        "content": "The government has withdrawn a planned reopening of the Taj Mahal (Reuters)\r\nNew Delhi/Agra: The government has withdrawn a planned reopening of the Taj Mahal, citing the risk of new coronavirus infe… [+1309 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "Asian News International | Posted by Kanishka Sarkar",
        "title": "UP hospital offers Covid-19 negative report for Rs 2,500, licence suspended - Hindustan Times",
        "description": "Meerut CMO Rajkumar said, “In the video, a man from the hospital can be heard saying that he can arrange COVID-19 negative report and the person can get operation or other things done.”",
        "url": "https://www.hindustantimes.com/india-news/up-hospital-offers-covid-19-negative-report-for-rs-2-500-licence-suspended/story-sXi4ioRJGVzbdoM9V1KerO.html",
        "urlToImage": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/07/06/Pictures/outbreak-paz-the-coronavirus-disease-covid-19_06bb8c70-bf27-11ea-9738-294dc8afd766.jpg",
        "publishedAt": "2020-07-06T01:24:34Z",
        "content": "The licence of a private hospital in Uttar Pradesh’s Meerut has been suspended after a video showing its staff member providing fake Covid-19 report had gone viral.\r\n“A video had gone viral in Meerut… [+732 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "The News Minute"
        },
        "author": null,
        "title": "Bengaluru International Exhibition Centre converted into 10,000-bed COVID facility - The News Minute",
        "description": "A massive COVID-Care Centre with over 10,000 beds is set to be opened at the Bengaluru International Exhibition Centre (BIEC) in the city. It is set to be the largest COVID-Care Centre in Karnataka and will house COVID-19 patients who are asymptomatic or have…",
        "url": "https://www.thenewsminute.com/article/bengaluru-international-exhibition-centre-converted-10000-bed-covid-facility-128007",
        "urlToImage": "https://www.thenewsminute.com/sites/default/files/BIEC_1200.jpg",
        "publishedAt": "2020-07-05T15:57:03Z",
        "content": "BIEC is set to be the largest COVID-Care Centre in Karnataka and will house COVID-19 patients who are asymptomatic or have mild symptoms.A massive COVID-Care Centre with over 10,000 beds is set to be… [+1997 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "News18"
        },
        "author": "News18",
        "title": "At Van Mahotsav, UP CM Adityanath Says Big Events Can Be Held With Social Distancing Amid Covid-19 - News18",
        "description": "The Uttar Pradesh government has set a target of planting 25 crore saplings during the \"Van Mahotsav\".",
        "url": "https://www.news18.com/news/india/at-van-mahotsav-up-cm-adityanath-says-big-events-can-be-held-with-social-distancing-amid-covid-19-2702125.html",
        "urlToImage": "https://images.news18.com/ibnlive/uploads/2020/04/1588267351_rtx38zeo.jpg",
        "publishedAt": "2020-07-05T08:08:32Z",
        "content": "Uttar Pradesh Chief Minister Yogi Adityanath on Sunday said big events can be held while adhering to the protocol pertaining to COVID-19 and the \"Van Mahotsav\" will be a witness to this.\r\n\"Pre-COVID,… [+1519 chars]"
      }
    ];
    this.statisticsSubscription = this.appService.getCovidStatistics().subscribe((data) => {
      console.log(data);
      this.result = data;
    });

    
    
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
    this.statisticsSubscription.unsubscribe();
  }

}
