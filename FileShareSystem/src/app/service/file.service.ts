import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessResponse } from '../core/dto/successResponse';
export interface MyFile {
  fileName: string;
  uploadDate : string;
  filePath: string;
}
@Injectable({
  providedIn: 'root'
})


export class FileService {

 
  private filesSubject = new BehaviorSubject<MyFile[]>([]);
  files$ = this.filesSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAllFiles(): Observable<MyFile[]> {
    return this.httpClient.get<MyFile[]>('/files/getAll');
  }

  addFileToList(file: MyFile): void {
    const currentFiles = this.filesSubject.value;
    this.filesSubject.next([...currentFiles, file]);
  }

  uploadFile(file: File): Observable<SuccessResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post<SuccessResponse>('/files/upload', formData);
  }
  downloadFile(fileId: string): void {
    window.location.href = `http://localhost:8080/api/v1/files/download/${fileId}`;
  }

  updateFile(file: File): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/files/update', file);
  }
  
  delete(id : string): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/files/delete', {id});
  }

  getFile(fileId: string): Observable<Blob> {
    return this.httpClient.get(`/files/${fileId}`, { responseType: 'blob' });
  }
  
}
