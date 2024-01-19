import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Team } from '../model/team';

const baseUrl = 'http://localhost:8080/api/Teams';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class TeamService {
 
  TeamsList: Team[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(baseUrl);
  }
  getAllBydepartment(departmentid:any): Observable<Team[]> {
    return this.http.get<Team[]>(`${baseUrl}/department/${departmentid}`);

  }

  get(id: any): Observable<Team> {
    return this.http.get<Team>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Team[]> {
    return this.http.get<Team[]>(`${baseUrl}?title=${title}`);
  }
  

}

