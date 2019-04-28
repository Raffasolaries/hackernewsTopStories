import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { 
  Router, NavigationStart, NavigationCancel, NavigationEnd 
} from '@angular/router';

import { HackernewsService } from './services/hackernews.service';

export interface Tile {
  // color: string;
  cols: number;
  rows: number;
  content: boolean;
  title?: string;
  by?: string;
  url?: string;
  index?: number;
  html?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'the HackerNews Top Stories';
  loading: boolean;
  mode = 'indeterminate';
  panelOpenState = false;
  tops = [];
  tiles: Tile[] = [];
  description: string;

  constructor (
    private hackernews: HackernewsService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.hackernews.getUrlContent('https://engineering.mixpanel.com/2011/08/05/how-and-why-we-switched-from-erlang-to-python/')
      .subscribe(urlCont => { 
        this.description = urlCont.description;
        console.log('description', this.description);
      });
    this.hackernews.getTopStories().subscribe(codes => {
      let index = 0;
      codes.forEach(code => {
        this.hackernews.getStoryDetails(code).subscribe(story => {
          /* this.hackernews.getUrlContent(story.url).subscribe(urlCont => {
            let cont = '';
            if ('description' in urlCont) cont = urlCont.description;
            else cont = urlCont; */
            index += 1;
            let tile = [
              {
                content: false,
                cols: 1,
                rows: 1
              }, {
                content: true,
                cols: 10,
                rows: 1,
                index: index,
                by: story.by,
                title: story.title,
                url: story.url
                // description: cont
              }, {
                content: false,
                cols: 1,
                rows: 1
              }
            ]
            Array.prototype.push.apply(this.tiles, tile);
            if (codes.length*3 === this.tiles.length) 
              this.loading = false;
            console.log('codes length', codes.length, 'tiles length', this.tiles.length)
          // })
        })
      })
    })
  }

}
