import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BackendConsumerService } from '../backend-consumer.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  currentUser: any;
  interestingData: any;
  airQualityData: any;
  displayedColumns: string[] = ['parameter', 'value', 'lastUpdated'];

  constructor(private authService: AuthService, private backendConsumerService: BackendConsumerService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  fetchInterestingData() {
    this.backendConsumerService.getInterestingData().subscribe(data => {
      this.interestingData = data;
    });
  }

  getAirQuality() {
    this.backendConsumerService.getAirQualityData().subscribe(data => {
      this.airQualityData = data;
    });
  }
}
