import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService, MyFile } from '../../service/file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.scss']
})
export class MyfilesComponent implements OnInit {
  files: MyFile[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadUserFiles();
  }

  loadUserFiles() {
    this.fileService.getAllFiles().subscribe(
      (files: MyFile[]) => {
        console.log(files);
        this.files = files;
      },
      (error: any) => {
        console.error('Error loading user files:', error);
      }
    );
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'pdf': return 'pdf';
      case 'docx': return 'word';
      case 'xlsx': return 'excel';
      default: return 'alt';
    }
  }

  downloadFile(path: string, event: Event): void {
    event.stopPropagation();
    this.fileService.downloadFile(path);
  }

  showInfo(file: MyFile, event: Event): void {
    event.stopPropagation();
   
  }

   getFile() {
    this.router.navigate(['/file']);
  }

}