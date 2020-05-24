import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event){
    console.log(event);
    const selectFiles = <FileList>event.srcElement.files;//event.srcElement.files;
    document.getElementById('customFileLabel').innerHTML = selectFiles[0].name;
  }
}
