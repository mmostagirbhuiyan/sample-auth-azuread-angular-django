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
  isLoading: boolean = false;
  displayedColumns: string[] = ['parameter', 'value', 'lastUpdated'];

  // Implement Search Functionality
  searchTerm: string = '';


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
    this.isLoading = true;
    this.backendConsumerService.getAirQualityData().subscribe(
      data => {
        this.airQualityData = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching air quality data:', error);
        this.isLoading = false;
      }
    );
  }

  filterAirQualityData() {
    this.isLoading = true;
    this.backendConsumerService.getAirQualityData().subscribe(
      data => {
        this.airQualityData = data;
        if (this.searchTerm) {
          this.airQualityData.results = this.airQualityData.results.filter((result: { location: string; city: string; country: string; }) =>
            (result.location && result.location.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (result.city && result.city.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (result.country && result.country.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching air quality data:', error);
        this.isLoading = false;
      }
    );
  }
}
