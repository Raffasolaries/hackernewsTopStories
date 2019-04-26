import { Component, OnInit, AfterViewInit } from '@angular/core';
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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hackernewsTopStories';
  loading: boolean;
  mode = 'indeterminate';
  panelOpenState = false;
  tops = [];
  tiles: Tile[] = [
    /* {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'}, */
  ];

  constructor (
    private hackernews: HackernewsService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.hackernews.getTopStories().subscribe(codes => {
      let index = 0;
      codes.forEach(code => {
        this.hackernews.getStoryDetails(code).subscribe(story => {
          console.log('story', story)
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
        })
      })
    })
  }

  /* ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
          if(event instanceof NavigationStart) {
            this.loading = true;
          }
          else if (
            event instanceof NavigationEnd || 
            event instanceof NavigationCancel
            ) {
            this.loading = false;
          }
      });
  } */


}
