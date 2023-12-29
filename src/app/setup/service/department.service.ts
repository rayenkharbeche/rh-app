import { Department } from '../model/department';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/Postes';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class DepartmentService {
  DepartmentsList: Department[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(baseUrl);
  }

  get(id: any): Observable<Department> {
    return this.http.get<Department>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Department[]> {
    return this.http.get<Department[]>(`${baseUrl}?title=${title}`);
  }

}

