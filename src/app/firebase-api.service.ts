import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ClipModel} from './clip.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
  public addSongEvent = new Subject();

  constructor(private http: HttpClient) { }

  getSongs() {
    return this.http.get('https://songs-3a111.firebaseio.com/song.json');
  }

  setSongs(clips: ClipModel[]) {
    return this.http.put('https://songs-3a111.firebaseio.com/song.json', clips);
  }
}
