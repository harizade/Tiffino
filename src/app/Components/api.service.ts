import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://localhost:9090/";
  constructor(private http:HttpClient, private router: Router) { }
   
    adminLogin(data:any){
       return this.http.post(this.apiUrl + "auth/login",data)
    }

    adminLOgout(){
      this.http.post(this.apiUrl + "auth/logout",{},{responseType: 'text'}).subscribe({
      next:(res)=>{
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.router.navigate(['/admin_login']);
      }
    })
    }

     addCloudKitchen(data:any){
      return this.http.post(this.apiUrl + "superAdmin/saveCloudKitchen",data,{responseType: 'text'})
    }

    addManager(data: FormData): Observable<any> {
      return this.http.post(this.apiUrl + "superAdmin/saveManager",data,  { responseType: 'text' })
    }

    getCloudeKitchen_WithManager(){
      return this.http.get(this.apiUrl + "superAdmin/getAllManagersWithCloudKitchen")
    }

    addSubscriptionPlan(data:any){
      return this.http.post(this.apiUrl + "superAdmin/saveOrUpdateSubscriptionPlan",data,{responseType: 'text'})
    }

    getAllSubscriptionPlans(){
      return this.http.get(this.apiUrl + "superAdmin/getAllSubscription")
    }

    deleteSubscriptionPlan(id:any){
      return this.http.delete(this.apiUrl + "superAdmin/deleteSubscriptionPlan/"+id,{responseType: 'text'})
    }

    addCuisine(data:any){
      return this.http.post(this.apiUrl + "superAdmin/saveOrUpdateCuisine",data,{responseType: 'text'})
    }

    getAllCuisines(){
      return this.http.get(this.apiUrl + "superAdmin/getAllCuisines")
    }

    addMeals(data:any){
      return this.http.post(this.apiUrl + "superAdmin/saveOrUpdateMeal",data,{responseType: 'text'})
    }
}
