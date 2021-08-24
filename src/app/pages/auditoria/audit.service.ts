import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) { }

  getLogs(): Observable<object[]> {
    const url = `${environment.urlApi}/audit`;
    return this.http.get<object[]>(url);
  }
}
