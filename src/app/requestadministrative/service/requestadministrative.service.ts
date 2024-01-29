import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Requestadministrative } from '../model/requestadministrative';

const baseUrl = 'http://localhost:8080/api/RequestAdministrative';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class RequestadministrativeService {
  requestadministrativeList: Requestadministrative[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Requestadministrative[]> {
    return this.http.get<Requestadministrative[]>(baseUrl);
  }

  get(id: any): Observable<Requestadministrative> {
    return this.http.get<Requestadministrative>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Requestadministrative[]> {
    return this.http.get<Requestadministrative[]>(`${baseUrl}?title=${title}`);
  }
    getAllbyUser(user_id: any): Observable<Requestadministrative[]> {
      return this.http.get<Requestadministrative[]>(`${baseUrl}?user_id=${user_id}`);
    }
    getAllbyUserValidation(user_id: any): Observable<Requestadministrative[]> {
      return this.http.get<Requestadministrative[]>(`${baseUrl}/validation?user_id=${user_id}`);
    }
    
}

