import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
    addCloudKitchen(data:any){
      return this.http.post("http://localhost:9090/superAdmin/saveOrUpdateCloudKitchen",data)
    }
}
