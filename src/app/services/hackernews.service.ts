import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackernewsService {

  constructor(private http: HttpClient) { }

  getTopStories(): Observable<any> {
    return this.http.get<any>('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .pipe(
        catchError(this.handleError<any>(`get top stories error`))
      );
  }

  getStoryDetails(code) {
    return this.http.get<any>('https://hacker-news.firebaseio.com/v0/item/'+code+'.json?print=pretty')
      .pipe(
        catchError(this.handleError<any>(`get story error`))
      );
  }

  getUrlContent(url) {
    return this.http.get<any>(/* 'http://api.linkpreview.net/' */url, {
      /* params: new HttpParams()
        .set('key', '5cc5f2352b4961d7944598827fac015ee561af34dd0b4')
        .set('q', url) */
    })
      .pipe(
        /* map(res => {
          if(res.status < 200 || res.status >= 300) {
            return "Link preview too many requests";
          } else return res;
        }) */
        catchError(this.handleError<any>(`get url error`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return observableOf(result as T);
    };
  }

}
