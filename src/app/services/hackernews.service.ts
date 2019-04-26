import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<any>(url)
      .pipe(
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
