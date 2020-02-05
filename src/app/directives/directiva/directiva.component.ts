import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {


  hideCourse = false;
  courseList : string[] = ['Typescript', 'Java', '.net', 'Ecma Scrip'];

  constructor() { }


}
