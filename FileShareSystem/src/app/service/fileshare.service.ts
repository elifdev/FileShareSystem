import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileShare } from '../core/dto/FileShare';

@Injectable({
  providedIn: 'root'
})
export class FileshareService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getAllFileShares(): Observable<FileShare[]>{
    return this.httpClient.get<FileShare[]>('/fileShares/getAll');
  }

}
