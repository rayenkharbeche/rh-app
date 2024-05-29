import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCZW5oYXJpemluZXM5NTdAZ21haWwuY29tIiwiaWF0IjoxNzAzNTgzODc2LCJleHAiOjE3MDM2NzAyNzZ9.h7Mpb193FiLWehWxCug7568IAuYhHuXYRvHxHF2QmYI'
       
        })
      };
     
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {

        return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);

                return user;
            }));
    }

    getToken() {
        return localStorage.getItem('access_token');
      }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
   
    refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
            .pipe(map((user) => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    // helper methods

    private refreshTokenTimeout?: NodeJS.Timeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtBase64 = this.userValue!.token!.split('.')[1];
        const jwtToken = JSON.parse(atob(jwtBase64));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/auth/signup`, user);
    }
    addUser(user: User) {
        return this.http.post(`${environment.apiUrl}/users/addUser`, user);
    }
    forgotpassword(user: User) {
        return this.http.post(`${environment.apiUrl}/auth/forgot-password`, user);
    }

    getAll() {
      
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    resetpassword(data: any){
        return this.http.put(`${environment.apiUrl}/auth/reset-password`, data)


    }

    resetInfo(id: string, params: any) {
      

        return this.http.put(`${environment.apiUrl}/users/resetInfo/${id}`, params)
            .pipe(map(x => {
           
                return x;
            }));
    }
    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params);
    }

    delete(id: any) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
    getAllbyDepartmentByposte(departmentId:any, posteId:any) {

        return this.http.get<User[]>(`${environment.apiUrl}/users/team?departmentId=`+ departmentId +"&posteId=" + posteId );
    }
    getAlluserbyDepartment(departmentId:any): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users/department?departmentId=`+ departmentId);
      }

      
      updateteamlead(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/teamlead/${id}`, params)
    }
    getAllbyDepartmentByteam(departmentId:any, teamId:any) { {
        return this.http.get<User[]>(`${environment.apiUrl}/users/team?departmentId=`+ departmentId +"&teamId=" + teamId );


      }
    }
    
    getEmployeeNumber() { {

        return this.http.get<any>(`${environment.apiUrl}/users/usersnumber`);

      }
    }
    getAvailableEmployeeNumber() { {

        return this.http.get<number>(`${environment.apiUrl}/users/availableEmployee`);

      }
    }
      
    updateteamleadStatus(id: string, params: any) {
       
        return this.http.put(`${environment.apiUrl}/users/teamleadstatus/${id}`, params)
    }
    updatemanagerStatus(id: string, params: any) {
       
        return this.http.put(`${environment.apiUrl}/users/managerstatus/${id}`, params)
    }
}