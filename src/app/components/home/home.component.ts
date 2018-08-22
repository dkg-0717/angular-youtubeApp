import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;
  title: any = '';
  // url: any = 'https://www.youtube.com/embed/';

  constructor(public _yts: YoutubeService) {
    this._yts.getVideo().subscribe( data => {
      this.videos = data;
    });
  }

  ngOnInit() {
  }

  verVideo(video: string) {
    this.title = video['title'];
    this.videoSel = video['resourceId'].videoId;
    $('#video').modal('show');
  }

  cerrarVideo() {
    $('#video').modal('hide');
    this.videoSel = '';
  }

  cargarMas() {
    this._yts.getVideo().subscribe( data => {
      this.videos.push(...data);
    });
  }

}
