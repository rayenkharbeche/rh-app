import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestAuthorization } from '../model/requestauthorization';

const baseUrl = 'http://localhost:8080/api/RequestAuthorisation';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class AuthorizationService {
  EntityList: RequestAuthorization[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<RequestAuthorization[]> {
    return this.http.get<RequestAuthorization[]>(baseUrl);
  }

  get(id: any): Observable<RequestAuthorization> {
    return this.http.get<RequestAuthorization>(`${baseUrl}/${id}`);
  }
  getbyuser(id: any): Observable<RequestAuthorization> {
    console.log(id);
    return this.http.get<RequestAuthorization>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    console.log("test");
    console.log(data);

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

  findByTitle(title: any): Observable<RequestAuthorization[]> {
    return this.http.get<RequestAuthorization[]>(`${baseUrl}?title=${title}`);
  }
  getAllbyUser(user_id: any): Observable<RequestAuthorization[]> {
    console.log(user_id);

    return this.http.get<RequestAuthorization[]>(`${baseUrl}?user_id=${user_id}`);
  }
  getAllbyTeam(user_id: any): Observable<RequestAuthorization[]> {
    return this.http.get<RequestAuthorization[]>(`${baseUrl}/RequestAuthorizationbyteam?user_id=${user_id}`);

  }
  updateStatus(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/updateStatus/${id}`, data);
  }

  getRemoteDaysbyuser(id: any):  Observable<number> {
    return this.http.get<number>(`${baseUrl}/remoteDays/${id}`);
  }
  
  
  getRemoteBymonthbyuser(id: any): Observable<Array<any>> {

    return this.http.get<any[]>(`${baseUrl}/AuthorisationrequestBymonth/${id}`);
  }
}

