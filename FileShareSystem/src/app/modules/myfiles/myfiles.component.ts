import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../service/file.service';

interface File {
  name: string;
  path: string;
  date: string;
  uploader: string;
}

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrl: './myfiles.component.scss'
})
export class MyfilesComponent implements OnInit {

  

  filesPerPage: File[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fileService : FileService,
  ) { }

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

  downloadFile(){
  this.fileService.downloadFile();
  }
}


