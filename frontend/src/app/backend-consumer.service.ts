import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BackendConsumerService {
  constructor(private http: HttpClient) { }

  // Add methods for interacting with the backend API as needed
}
