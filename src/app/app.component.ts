import { Component, OnInit } from '@angular/core';

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
    this.hackernews.getTopStories().subscribe(codes => {
      console.log('stories', codes)
      let index = 0;
      codes.forEach(code => {
        this.hackernews.getStoryDetails(code).subscribe(story => {
          console.log('story', story)
          index += 1;
          // this.hackernews.getUrlContent(story.url).subscribe(html => {
            this.tiles.push({
              content: false,
              cols: 1,
              rows: 1
            });
            this.tiles.push({
              content: true,
              cols: 4,
              rows: 1,
              index: index,
              by: story.by,
              title: story.title,
              url: story.url
            });
            this.tiles.push({
              content: false,
              cols: 1,
              rows: 1
            });
        })
      })
    })
  }


}
