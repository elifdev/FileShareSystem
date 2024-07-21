import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService, MyFile } from '../../service/file.service';
import { SuccessResponse } from '../../core/dto/successResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  selectedFile: File | null = null;

  constructor(
    
    private toastr: ToastrService,
    private router: Router,
    private fileService : FileService,
    private route: ActivatedRoute,
  ) { }


  myFiles(){
    this.router.navigate(['/myfiles']);

  }

  allFiles() {
    this.router.navigate(['/allfiles']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

 

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     console.log("Dosya seçildi: ", file);
  //   }
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("Dosya seçildi: ", file); 
    } else {
      console.warn("Dosya seçilmedi."); 
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("Dosya yükleniyor: ", this.selectedFile); 
      this.fileService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log("Yükleme başarılı: ", response); 
          this.toastr.success('Dosya başarıyla yüklendi');
          this.router.navigate(['/myfiles'], { relativeTo: this.route });
        },
        error => {
          console.error("Yükleme hatası: ", error); 
          this.toastr.error('Dosya yükleme başarısız');
        }
      );
    } else {
      console.warn("Hiçbir dosya seçilmedi."); 
    }
  }


}
