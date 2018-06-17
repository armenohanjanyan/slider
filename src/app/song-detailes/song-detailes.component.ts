import { Component, OnInit } from '@angular/core';
import {ClipModel} from '../clip.model';
import {FirebaseApiService} from '../firebase-api.service';

@Component({
  selector: 'app-song-detailes',
  templateUrl: './song-detailes.component.html',
  styleUrls: ['./song-detailes.component.css']
})
export class SongDetailesComponent  {

  public clip: ClipModel = {
    artist: '',
    song: '',
    url: ''
  };

  constructor(private firebaseService: FirebaseApiService) { }


  enterSong(newClip: ClipModel) {
    // fire the Subject type event
    this.firebaseService.addSongEvent.next(newClip)
  }

}
