import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../service/file.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent implements OnInit {
  fileContent: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const filePath = this.route.snapshot.paramMap.get('id');
    const decodedPath = decodeURIComponent(filePath || '');  // Parametreyi çöz
    this.loadFile(decodedPath);
  }

  loadFile(filePath: string) {
    this.fileService.getFile(filePath).subscribe((file) => {
      const url = URL.createObjectURL(file);
      this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
