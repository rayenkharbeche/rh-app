import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Requestequipment } from '../model/requestequipment';


const baseUrl = 'http://localhost:8080/api/RequestEquipment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class RequestequipmentService {
  requestleaveList: Requestequipment[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Requestequipment[]> {
    return this.http.get<Requestequipment[]>(baseUrl);
  }

  get(id: any): Observable<Requestequipment> {
    return this.http.get<Requestequipment>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Requestequipment[]> {
    return this.http.get<Requestequipment[]>(`${baseUrl}?title=${title}`);
  }
    getAllbyUser(user_id: any): Observable<Requestequipment[]> {
      return this.http.get<Requestequipment[]>(`${baseUrl}?user_id=${user_id}`);
    }
    
    updateStatus(id: any, data: any): Observable<any> {
      console.log(data)
      return this.http.put(`${baseUrl}/updateStatus/${id}`, data);
    }
    getAllbyUserValidation(user_id: any): Observable<Requestequipment[]> {
      return this.http.get<Requestequipment[]>(`${baseUrl}/validation?user_id=${user_id}`);
    }
    

    
   

}

