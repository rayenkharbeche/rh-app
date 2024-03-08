import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Equipment } from '../model/equipment';

const baseUrl = 'http://localhost:8080/api/Equipments';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE'
  })
};

@Injectable()
export class EquipmentService {
  EquipmentsList: Equipment[] = [];

  constructor(private http: HttpClient) {
  }
  
  getAllbyUserId(id:any): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${baseUrl}/${id}`);
  }
  
  getAllbyUserIdbyName(id:any,equipmentName:any): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${baseUrl}/byName/${id}?name=${equipmentName}`);
  }
  getbyUserIdbyName(id:any,equipmentName:any): Observable<Equipment> {
    return this.http.get<Equipment>(`${baseUrl}/byName/${id}?name=${equipmentName}`);
  }

 
  getAllbyReference(equipmentRef:any): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${baseUrl}/byReference?reference=${equipmentRef}`);
  }
  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(baseUrl);
  }

  get(id: any): Observable<Equipment> {
    return this.http.get<Equipment>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
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

  findByTitle(title: any): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${baseUrl}?title=${title}`);
  }

}

