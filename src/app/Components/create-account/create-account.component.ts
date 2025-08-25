import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent 
{
  constructor(private api:ApiService){}
   createAccount(form:any)
   {
      console.log(form.value);
   }
}
