import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseBackendURL = process.env.NG_APP_BACKEND_URL;

@Injectable({ providedIn: 'root' })
export class BackendConsumerService {
  constructor(private http: HttpClient) { }

  fetchInterestingData() {
    return this.http.get<any>(`${baseBackendURL}/api/interesting-data/`);
  }

  getAirQualityData() {
    return this.http.get(`${baseBackendURL}/api/air-quality/`);
  }
}
