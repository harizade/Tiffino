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
// export class ForgotPasswordComponent {
//    forgotPasswordForm: FormGroup;

//    constructor(private api:ApiService){
//     this.forgotPasswordForm = new FormGroup({
//       email:new FormControl(''),
//     });
//    }

//    sendOtp(){
//     const formData = new FormData();
//     formData.append('email', this.forgotPasswordForm.get('email')?.value);

//     this.api.forgotPassword(this.forgotPasswordForm.value).subscribe({
//       next: (res) => {
//         console.log('OTP sent successfully:', res);
//         alert('OTP sent successfully! Please check your email.');
//         this.forgotPasswordForm.reset();
//       },
//       error: (err) => {
//         console.error('Error sending OTP:', err);
//         alert('Error sending OTP! Please try again.');
//       },
    
//    })
// }
// }




// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ApiService } from '../api.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-forgot-password',
//   imports:[CommonModule],
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  isOtpReceived: boolean = false;
  constructor(private api: ApiService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.resetPasswordForm = new FormGroup({
       otp: new FormControl('', [Validators.required]),
       newPassword: new FormControl('', [Validators.required]),
    });
  }

  sendOtp() {
    if (this.forgotPasswordForm.invalid) {
      alert('Please enter a valid email address.');
      return;
    }

    const emailValue = this.forgotPasswordForm.get('email')?.value;
    const emailData = { email: emailValue };

    this.api.forgotPassword(emailData, emailValue).subscribe({
      next: (res) => {
        console.log('OTP sent successfully:', res);
        alert('OTP sent successfully! Please check your email.');
        this.isOtpReceived = true;
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
    email: this.forgotPasswordForm.get('email')?.value,
    otp: formValue.otp,
    newPassword: formValue.newPassword
  }).subscribe({
    next: (res) => {
      console.log('Password reset successfully:', res);
      alert('Password reset successfully! You can now log in with your new password.');
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
