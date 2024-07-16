import { Component, OnInit } from '@angular/core';
import { FileShare } from '../../core/dto/FileShare';


interface File {
  name: string;
  path: string;
  date: string;
  uploader: string;
}


@Component({
  selector: 'app-allfiles',
  templateUrl: './allfiles.component.html',
  styleUrl: './allfiles.component.scss'
})
export class AllfilesComponent implements OnInit {

  

  filesPerPage: File[] = [];

  constructor() { }

  ngOnInit(): void { }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'pdf': return 'pdf';
      case 'docx': return 'word';
      case 'xlsx': return 'excel';
      default: return 'alt';
    }
  }
}
