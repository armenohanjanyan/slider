import { Component, Input } from '@angular/core';
import { ClipModel } from '../clip.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent {
  @Input() clip: ClipModel;

  constructor(public sanitizer: DomSanitizer) { }

}
