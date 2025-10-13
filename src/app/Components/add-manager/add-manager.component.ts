import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-manager',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,MatFormFieldModule ],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css',
})
export class AddManagerComponent {
  addManagerForm: FormGroup;
  data: any;
  constructor(private api: ApiService) {
    this.addManagerForm = new FormGroup({
      managerName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
      managerEmail: new FormControl('',[Validators.required, Validators.email]),
      dob: new FormControl(''),
      phoneNo: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      currentAddress: new FormControl('',[Validators.required, Validators.minLength(3)]),
      permeantAddress: new FormControl('',[Validators.required, Validators.minLength(3)]),
      city: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
      cloudKitchenId: new FormControl(''),
      adharCard: new FormControl(null),
      panCard: new FormControl(null),
      photo: new FormControl(null),
    });
  }
  get managerName() { return this.addManagerForm.get('managerName')!; }
  get phoneNo() { return this.addManagerForm.get('phoneNo')!; }
  get managerEmail() { return this.addManagerForm.get('managerEmail')!; }
  get currentAddress() { return this.addManagerForm.get('currentAddress')!; }
  get permeantAddress() { return this.addManagerForm.get('permeantAddress')!; }
  get city() { return this.addManagerForm.get('city')!; }


  ngOnInit(){
    this.getCloudKitchen()
  }
  onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.addManagerForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

  saveManager() {

    if (this.addManagerForm.invalid) {
      this.addManagerForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    formData.append('managerName',this.addManagerForm.get('managerName')?.value);
    formData.append('managerEmail',this.addManagerForm.get('managerEmail')?.value);
    formData.append('dob', this.addManagerForm.get('dob')?.value);
    formData.append('phoneNo', this.addManagerForm.get('phoneNo')?.value);
    formData.append('currentAddress',this.addManagerForm.get('currentAddress')?.value);
    formData.append('permeantAddress',this.addManagerForm.get('permeantAddress')?.value);
    formData.append('city', this.addManagerForm.get('city')?.value);
    formData.append('cloudKitchenId',this.addManagerForm.get('cloudKitchenId')?.value);

    formData.append('adharCard', this.addManagerForm.get('adharCard')?.value);
    formData.append('panCard', this.addManagerForm.get('panCard')?.value);
    formData.append('photo', this.addManagerForm.get('photo')?.value);

    this.api.addManager(formData).subscribe({
      next: (res) => {
        console.log('Response from server:', res)
        alert(res);       
      if(res.includes('Manager Inserted Successfully!!')){
         this.addManagerForm.reset();
      }
      },
      error: (err) => {
        console.error('API error:', err);
        alert('An error occurred while saving the manager.');
      }
  
    });

    const fileInputs =
      document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ''));

    
  }

  // Showing data For CloudKitchen
  getCloudKitchen(){
    this.api.getCloudeKitchen_WithManager().subscribe({
      next: (res: any) => {
        this.data = res.data || res; 
        console.log('Cloud Kitchen Data:', this.data);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }
}
