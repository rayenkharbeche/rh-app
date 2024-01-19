import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Requestleave } from '../model/requestleave';
import { FileDB } from '../model/filedb';

const baseUrl = 'http://localhost:8080/api/RequestLeave';

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

  getAllbyuser(id: any): Observable<Requestleave> {
    return this.http.get<Requestleave>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Requestleave[]> {
    return this.http.get<Requestleave[]>(`${baseUrl}?title=${title}`);
  }
<<<<<<< Updated upstream
=======
    getAllbyUser(user_id: any): Observable<Requestleave[]> {
      return this.http.get<Requestleave[]>(`${baseUrl}?user_id=${user_id}`);
    }

 
    getAllbyTeam(user_id: any): Observable<Requestleave[]> {
      return this.http.get<Requestleave[]>(`${baseUrl}/RequestLeavebyteam?user_id=${user_id}`);

    }
    
    updateStatus(id: any, data: any): Observable<any> {
      console.log(data)
      return this.http.put(`${baseUrl}/updateStatus/${id}`, data);
    }

    
    updateCredit( data: any): Observable<any> {
      console.log("test")
      return this.http.put(`${baseUrl}/updateleaveCredit`, data);
    }
    getAllSickLeavebyuser(id: any):  Observable<Requestleave[]> {
      return this.http.get<Requestleave[]>(`${baseUrl}/SickLeave/${id}`);
    }
    
    getFileDB(id: any): Observable<FileDB> {
      return this.http.get<FileDB>(`${baseUrl}/files/${id}`);
    }
>>>>>>> Stashed changes

}

