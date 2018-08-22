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

  getVideo(max?: any) {

    const url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();
    max = max || 10;

    params = params.set('part', 'snippet');
    params = params.set('maxResults', max);
    params = params.set('playlistId', this.playlist);
    params = params.set('key', this.apikey);

    if (this.nextpageToken) {
      params = params.set('pageToken', this.nextpageToken);
    }

    return this.http.get(url, { params: params })
                    .pipe(map( data => {
                      const videos: any[] = [];
                      this.nextpageToken = data['nextPageToken'];
                      for (const video of data['items']) {
                        videos.push(video.snippet);
                      }
                      return videos;
                    }));
  }
}


