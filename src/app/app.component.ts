import {Component, OnInit} from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import {ClipModel} from './clip.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public clips: ClipModel[] = [];
  public clip: ClipModel;

  constructor(private firebaseService: FirebaseApiService) {}

  ngOnInit() {
    this.populateSongs();
    // listen to the added song event which is of type Subject
    this.firebaseService.addSongEvent
      .subscribe((clip: ClipModel) => {
        this.addNewSong(clip);
      });
  }

  // as soon as component initialized get songs from the server and
  // populate into the clips array
  populateSongs() {
    this.firebaseService.getSongs()
      .subscribe(
        (songs: ClipModel[]) => {
          this.clips = songs;
          // set the first music video
          this.clip = this.clips[0];
        }
      )
  }

  changeSlide(n: number){
    let songIndex;
    // get the index of the current clip in the clips array
    this.clips.map((clip, i) => {
        if (this.clip.url === clip.url) songIndex = i;
    });
    // if the index is 0 and the "prev" button pushed
    // return to the last clip
    if (songIndex === 0 && n === -1) {
      this.clip = this.clips[this.clips.length -1];
      return;
    }
    // if the current clip is the last in the array and the "next"
    // pushed return to the first clip
    if (songIndex === this.clips.length -1 && n === 1) {
      this.clip = this.clips[0];
      return;
    }

    // otherwise just change the index
    this.clip = this.clips[songIndex + n];
  }

  selectSong(i: number) {
    this.clip = this.clips[i];
  }

  addNewSong(clip: ClipModel) {
    // push the newly added clipModel object and send to the firebase via put method
    this.clips.push(clip);
    this.firebaseService.setSongs(this.clips).subscribe()
  }
}
