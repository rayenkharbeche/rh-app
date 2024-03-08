import { Entity } from '../model/entity';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GeneralControl } from '../model/generalControl';
import { FileDB } from '../../requestleave/model/filedb';

const baseUrl = 'http://localhost:8080/api/excel';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class ExcelFiles {
  EntityList: GeneralControl[] = [];

  constructor(private http: HttpClient) {
  }

      
  getFileDB(file: any): Observable<FileDB> {
    return this.http.get<FileDB>(`${baseUrl}/upload?file?${file}`);
  }
}

