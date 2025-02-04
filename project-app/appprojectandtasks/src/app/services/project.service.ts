import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getApiUrl } from '../interface/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  postData(body: any, endPoint: string): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.post(server, JSON.stringify(body), options);
  }


  getData(endPoint: string): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.get(server, options);
  }


  putData(body: any, endPoint: string): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.put(server, JSON.stringify(body), options);
  }

  patchData(body: any, endPoint: string): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.patch(server, JSON.stringify(body), options);
  }

  deleteData(endPoint: string): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.delete(server, options,);
  }
}
