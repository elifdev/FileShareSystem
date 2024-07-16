import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../core/dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class FileService {

 
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllFiles(): Observable<File[]>{
    return this.httpClient.get<File[]>('/files/getAll');
  }

  uploadFile(file: File): Observable<SuccessResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post<SuccessResponse>('/files/upload', formData);
  }
  downloadFile(){
    window.location.href='http://localhost:8080/api/v1/files/download/{fileId}';
  }

  updateFile(file: File): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/files/update', file);
  }
  
  delete(id : string): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/files/delete', {id});
  }

  
}
