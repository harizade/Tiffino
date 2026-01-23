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
        name : new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]),
        email :new FormControl('',[Validators.required, Validators.email]),
        phoneNo : new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
        cloudKitchenId : new FormControl(''),
        adharCard: new FormControl(null,[Validators.required]),                                   
        licences: new FormControl(null,[Validators.required]),
        insurance: new FormControl(null,[Validators.required]),
        deliveryPersonId:new FormControl(0) 
      })
  }

  get name() { return this.addDeliveryPersonForm.get('name')!; }
  get email() { return this.addDeliveryPersonForm.get('email')!; }
  get phoneNo() { return this.addDeliveryPersonForm.get('phoneNo')!; }
  get adharCard() { return this.addDeliveryPersonForm.get('adharCard')!; }
  get licences() { return this.addDeliveryPersonForm.get('licences')!; }
  get insurance() { return this.addDeliveryPersonForm.get('insurance')!; }


 ngOnInit(): void {
  this.getCloudKitchenData();
}


  onFileSelect(event: any, controlName: string) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    this.addDeliveryPersonForm.get(controlName)?.setValue(file);
    this.addDeliveryPersonForm.get(controlName)?.markAsTouched();
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
