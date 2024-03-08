import { Entity } from '../model/entity';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MailTemplate } from '../model/MailTemplate';

const baseUrl = 'http://localhost:8080/api/MailTemplate';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class MailTemplateService {
  EntityList: MailTemplate[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<MailTemplate[]> {
    return this.http.get<MailTemplate[]>(baseUrl);
  }

  get(id: any): Observable<MailTemplate> {
    return this.http.get<MailTemplate>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    console.log("test");
    return this.http.post(baseUrl, data, HTTP_OPTIONS);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }


  

}

