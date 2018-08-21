import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apikey: string = 'AIzaSyBh5GH3ZKaT8qg21L6C12ziW77wBDv9lhY';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';

  private nextpageToken: string = '';

  constructor(public http: HttpClient ) { }

  getVideo() {

    const url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params = params.set('part', 'snippet');
    params = params.set('maxResults', '10');
    params = params.set('playlistId', this.playlist);
    params = params.set('key', this.apikey);

    return this.http.get(url, { params: params })
                    .pipe(map( data => {
                      this.nextpageToken = data['nextPageToken'];
                      return data['items'];
                    }));
  }
}


