import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://localhost:9090/";
  constructor(private http:HttpClient) { }
    addCloudKitchen(data:any){
      return this.http.post(this.apiUrl + "superAdmin/saveCloudKitchen",data,{responseType: 'text'})
    }

    adminLogin(data:any){
       return this.http.post(this.apiUrl + "auth/login",data)
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
}
