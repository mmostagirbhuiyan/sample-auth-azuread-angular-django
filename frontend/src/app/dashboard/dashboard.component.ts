import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  roles: Role[] = [
    {value: 'employee', viewValue: 'Employee'},
    {value: 'employer', viewValue: 'Employer'},
    {value: 'contractor', viewValue: 'Contractor'},
  ];

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch and set user data to the form
    this.authService.getUserProfile().subscribe((userData) => {
      this.profileForm.patchValue(userData);
    });
  }

  updateProfile(): void {
    this.authService.updateUserProfile(this.profileForm.value).subscribe(() => {
      // Show a success message or navigate to another page
      this.ngOnInit();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  compareFunction(optionValue: string, selectedValue: string) {
    return optionValue === selectedValue;
  }
}
