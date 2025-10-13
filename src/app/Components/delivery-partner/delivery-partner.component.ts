import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-partner',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './delivery-partner.component.html',
  styleUrl: './delivery-partner.component.css'
})
export class DeliveryPartnerComponent {
   addDeliveryPersonForm : FormGroup;


  constructor(private api:ApiService){
      this.addDeliveryPersonForm = new FormGroup({
        name : new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
        email :new FormControl('',[Validators.required, Validators.email]),
        phoneNo : new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
        cloudKitchenId : new FormControl(''),
        adharCard: new FormControl(null),
        licences: new FormControl(null),
        insurance: new FormControl(null),
        deliveryPersonId:new FormControl(0) 
      })
  }

  get name() { return this.addDeliveryPersonForm.get('name')!; }
  get email() { return this.addDeliveryPersonForm.get('email')!; }
  get phoneNo() { return this.addDeliveryPersonForm.get('phoneNo')!; }


 ngOnInit(): void {
  this.getCloudKitchenData();
}


  onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.addDeliveryPersonForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

  addDeliveryPerson(){
      if (this.addDeliveryPersonForm.invalid) {
      this.addDeliveryPersonForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('name',this.addDeliveryPersonForm.get('name')?.value);
    formData.append('email',this.addDeliveryPersonForm.get('email')?.value);
    formData.append('phoneNo',this.addDeliveryPersonForm.get('phoneNo')?.value);
    formData.append('adharCard',this.addDeliveryPersonForm.get('adharCard')?.value);
    formData.append('licences',this.addDeliveryPersonForm.get('licences')?.value);
    formData.append('insurance',this.addDeliveryPersonForm.get('insurance')?.value);
    formData.append('cloudKitchenId',this.addDeliveryPersonForm.get('cloudKitchenId')?.value);
    formData.append('deliveryPersonId',this.addDeliveryPersonForm.get('deliveryPersonId')?.value);


   this.api.addDeliveryPerson(formData).subscribe({
   next: (res) => {
        console.log('Response from server:', res)
        alert(res);       
     
         this.addDeliveryPersonForm.reset();
      
      },
      error: (err) => {
        console.error('API error:', err);
        alert('An error occurred while adding the delivery Person.');
      }
  });
   const fileInputs =
      document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ''));
  }
  data: any[] = []; 

getCloudKitchenData() {
  this.api.getCloudKitchenDeliveryPerson().subscribe({
    next: (res: any) => {
      console.log('Full data:', res);

      this.data = res.map((ck: any) => ({
        cloudKitchenId: ck.cloudKitchenId,
        deliveryPersons: ck.deliveryPersons.map((dp: any) => dp.name) 

      }));

      console.log('Mapped data:', this.data); 

    },
    error: (err) => console.log('Error:', err)
  });
}

}
