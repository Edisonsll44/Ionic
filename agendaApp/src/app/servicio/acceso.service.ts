import { ENDPOINTS, getApiUrl } from './../../interfaces/constantes';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  constructor(private http: HttpClient) { }

  postData(body: any, endPoint: keyof typeof ENDPOINTS): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl(endPoint);
    return this.http.post(server, JSON.stringify(body), options);
  }


  getData(): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl("PERSON_API");
    return this.http.get(server, options);
  }


  putData(body: any): Observable<any> {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: head };
    let server = getApiUrl("REGISTER");
    return this.http.put(server, JSON.stringify(body), options);
  }

}
