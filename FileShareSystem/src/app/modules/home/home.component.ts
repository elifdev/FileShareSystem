import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../service/file.service';
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
  //     console.log("Dosya seçildi: ", file); // Konsola dosya bilgilerini yazdır
  //   }
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("Dosya seçildi: ", file); // Konsola dosya bilgilerini yazdır
    } else {
      console.warn("Dosya seçilmedi."); // Dosya seçilmemişse uyarı mesajı ver
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("Dosya yükleniyor: ", this.selectedFile); // Yükleme işleminden önce konsola dosya bilgilerini yazdır
      this.fileService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log("Yükleme başarılı: ", response); // Başarılı yanıtı konsola yazdır
          this.toastr.success('Dosya başarıyla yüklendi');
        },
        error => {
          console.error("Yükleme hatası: ", error); // Hata durumunu konsola yazdır
          this.toastr.error('Dosya yükleme başarısız');
        }
      );
    } else {
      console.warn("Hiçbir dosya seçilmedi."); // Dosya seçilmemişse uyarı mesajı ver
    }
  }

}
