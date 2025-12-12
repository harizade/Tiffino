import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})   

export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  isOtpReceived: boolean = false;
  constructor(private api: ApiService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      emailOrId: new FormControl(''),
      // emailOrId: new FormControl('', [Validators.required, Validators.email]),

    });
      

    this.resetPasswordForm = new FormGroup({
       otp: new FormControl('', [Validators.required]),
       newPassword: new FormControl('', [Validators.required]),
       confirmNewPassword: new FormControl('',[Validators.required])
    });
  }
        get emailOrId() { return this.forgotPasswordForm.get('emailOrId')!; }

sendOtp() {
  if (this.forgotPasswordForm.invalid) {
    alert('Please enter a valid email address.');
    return;
  }

  const emailOrIdValue = this.forgotPasswordForm.get('emailOrId')?.value;
  const emailOrIdData = { emailOrId: emailOrIdValue };

  this.api.forgotPassword(emailOrIdData, emailOrIdValue).subscribe({
    next: (res: string) => {
      console.log('API Response:', res);

      if (res.includes('Invalid')) {
        alert('Invalid user credentials. Please try again.');
      } else if (res.includes('Check your Email')) {
        alert('OTP sent successfully! Please check your email.');
        this.isOtpReceived = true;
      } else {
        alert('Unexpected response: ' + res);
      }
    },
    error: (err) => {
      console.error('Error sending OTP:', err);
      alert('Error sending OTP! Please try again.');
    },
  });
}

  resetPassword(){
    if (this.resetPasswordForm.invalid) {
    alert('Please fill all fields correctly.');
    return;
  }

  const formValue = this.resetPasswordForm.value;

  this.api.resetPassword({
    emailOrId: this.forgotPasswordForm.get('emailOrId')?.value,
  otp: formValue.otp,
  newPassword: formValue.newPassword,
  confirmNewPassword: formValue.confirmNewPassword
}).subscribe({
  next: (res) => {
    console.log('Password reset successfully:', res);
    alert(res);  
    this.resetPasswordForm.reset();
    this.router.navigate(['/login']);
  },
  error: (err) => {
    console.error('Error resetting password:', err);
    alert('Error resetting password! Please try again.');
  },
});

}
}
