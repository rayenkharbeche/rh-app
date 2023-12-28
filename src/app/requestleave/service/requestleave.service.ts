import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Requestleave } from '../model/requestleave';

const baseUrl = 'http://localhost:8080/api/Entities';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class RequestleaveService {
  requestleaveList: Requestleave[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Requestleave[]> {
    return this.http.get<Requestleave[]>(baseUrl);
  }

  get(id: any): Observable<Requestleave> {
    return this.http.get<Requestleave>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Requestleave[]> {
    return this.http.get<Requestleave[]>(`${baseUrl}?title=${title}`);
  }

}

