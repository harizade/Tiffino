import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getMeals() {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string;
  public cartCount:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.baseURL;
  }

  adminLogin(data: any) {
    return this.http.post(this.apiUrl + 'auth/login', data);
  }

  parseJwt(token: any) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  getRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.parseJwt(token);
      return tokenPayload ? tokenPayload.role : null;
    }
  }

  adminLOgout() {
    this.http
      .post(this.apiUrl + 'auth/logout', {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
      });
  }

   userLOgout() {
    return this.http.post(this.apiUrl + 'auth/logout', {}, { 
    responseType: 'text',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
  });
  }

  forgotPassword(data: any, emailOrId: string) {
    return this.http.post(this.apiUrl + 'auth/forgotPassword', data, {
      params: { emailOrId: emailOrId },
      responseType: 'text',
      withCredentials: true
    });
  }

 resetPassword(data: any) {
  return this.http.post(this.apiUrl + 'auth/changePassword', null, {
    params: {
       emailOrId: data.emailOrId,
      otp: data.otp,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword
    },
    responseType: 'text',
    withCredentials: true
  });
}
  
 viewProfile() {
  return this.http.get(this.apiUrl + 'auth/getProfile');
}

  
 
  
                                      // User Side Api
 getAllCloudKitchenName(){
    return this.http.get(this.apiUrl + 'user/getAllCloudKitchenName')
  }
 
  userRegister(data: any) {
    return this.http.post(this.apiUrl + 'user/register', data, {responseType: 'text'});
  }

  userSubscription(data:any){
    return this.http.post(this.apiUrl + 'user/assignSubscriptionToUser',data)
  }

  allAvailableMeals(){
    return this.http.get(this.apiUrl + 'user/getAllAvailableMealsGroupedByCuisine');
  }

  userGiftCard(){
    return this.http.get(this.apiUrl + 'user/getAllGiftCardsOfUser');
  }

  addToCart(data: any) {
    return this.http.post(this.apiUrl + 'user/addCart',data, {responseType: 'text'});
  }

  viewCart(){
    return this.http.get(this.apiUrl + 'user/viewCart')
  }

  removeCard(id: number) {
    return this.http.delete(`${this.apiUrl}user/removeMeal/${id}`,{ responseType: 'text' });
  }

  incDec(data:any){
    return this.http.post(this.apiUrl + 'user/updateCartQuantities',data, {responseType:'text'})
  }

  placeOrder(data:any){
    return this.http.post(this.apiUrl + 'user/orders',data ,{responseType:'text'})
  }

  getAllOrderUser(){
    return this.http.get(this.apiUrl + 'user/getAllOrders')
  }


  trackOrder(id: number) {
  return this.http.get(`${this.apiUrl}user/trackOrder/${id}`);
 }

  ratting_Reviews(review:any){
    return this.http.post(this.apiUrl + 'user/createReview',review,{responseType:'text'})
  }
 

  viewInvoice(id: number, options?: any) {
    return this.http.get(this.apiUrl + 'user/viewInvoice/' + id, {...options,responseType: 'blob'});
 }

   getAllStateName(){
   return this.http.get(this.apiUrl + 'user/getAllStateName')
 }

 searchFilterUser(payload: any): Observable<any> {
  return this.http.post(this.apiUrl + 'user/searchFilterForUser', payload);
}

getAllCuisinesUser(){
  return this.http.get(this.apiUrl + 'user/getAllCuisines')
 }

 getAvailableMealsByStateName(stateName: string) {
  return this.http.get(this.apiUrl + 'user/getAllMealsByCuisineName/' + stateName);
}

getOffer(){
    return this.http.get(this.apiUrl + 'user/getOffers', { responseType: 'text' })
  }

  editUserProfile(data:any){
    return this.http.post(this.apiUrl + 'user/updateUser',data,{ responseType: 'text' })
  }



                                      // Manager Side Api
 getAllOrder() {
    return this.http.get<any[]>(`${this.apiUrl}manager/getAllOrders`);
  }

  addMenu(){
    return this.http.get(this.apiUrl + 'manager/getAllCuisinesAndMeals');
   }
  addOrRemoveMeal(mealId: number):Observable<any> {
  return this.http.post(this.apiUrl + 'manager/addOrRemoveMeals/' + mealId, {}, { responseType: 'text' } );
   }
  
  cloudeKitchenData(){
    return this.http.get(this.apiUrl + 'manager/getDataOfCloudKitchen');
  }

  getAllDeliveryPersons() {
    return this.http.get<any[]>(`${this.apiUrl}manager/listOfDeliveryPersonIsAvailable`);
  }

  assignOrderToDeliveryPerson(orderId: number, deliveryPersonId: number) {
    return this.http.post(`${this.apiUrl}manager/assignOrderToDeliveryPerson`, null, {
      params: { orderId: orderId, deliveryPersonId: deliveryPersonId },
      responseType: 'text'
    });
  }



                                      // Delivery partner Side Api

 pikUpOrder(deliveryId: string) {
   return this.http.post(`${this.apiUrl}delivery-person/${deliveryId}/pickup`, {} ,{responseType:'text'});
  }

  deliverOrder(deliveryId: string) {
   return this.http.post(`${this.apiUrl}delivery-person/${deliveryId}/deliver`, {} ,{responseType:'text'});
  }

                                      // Admin Side Api

updateAdmin(data:any){
  const token = localStorage.getItem('authToken');
  return this.http.post(this.apiUrl + 'superAdmin/updateAdmin',data,
    { headers: { Authorization: `Bearer ${token}` }, responseType: 'text'}
  )
 }

addCloudKitchen(data: any) {
    return this.http.post(this.apiUrl + 'superAdmin/saveCloudKitchen', data, {responseType: 'text'});
   }
  addManager(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'superAdmin/saveManager', data, {responseType: 'text'});
   }
  getCloudeKitchen_WithManager() {
    return this.http.get(
      this.apiUrl + 'superAdmin/getAllManagersWithCloudKitchen');
   }

 addSubscriptionPlan(data: any) {
    return this.http.post(
      this.apiUrl + 'superAdmin/saveOrUpdateSubscriptionPlan',data,{ responseType: 'text' });
   }
  getAllSubscriptionPlans() {
  return this.http.get<any[]>(this.apiUrl + 'superAdmin/getAllSubscribedUser');
  }
  deleteSubscriptionPlan(id: any) {
    return this.http.delete(
      this.apiUrl + 'superAdmin/deleteSubscriptionPlan/' + id,{ responseType: 'text' });
   }
 addCuisine(cuisineData: FormData): Observable<any> {
  return this.http.post(this.apiUrl + 'superAdmin/saveOrUpdateCuisine', cuisineData, {
    responseType: 'text'});
 }
  getAllCuisines() {
    return this.http.get(this.apiUrl + 'superAdmin/getAllCuisines');
  }

  addMeals(data: any) {
    return this.http.post(this.apiUrl + 'superAdmin/saveOrUpdateMeal', data, {responseType: 'text'});
  }

 addDeliveryPerson(data:any){
    return this.http.post(this.apiUrl + 'superAdmin/saveOrUpdateDeliveryPerson',data,{responseType: 'text'})
  }

  getCloudKitchenDeliveryPerson() {
  return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKitchenData', { withCredentials: true });
  }

 getCloudKitchenList(){
  return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKitchenData')
 }

 searchFilterForAdmin(payload: any): Observable<any> {
  return this.http.post(this.apiUrl + 'superAdmin/searchFilterForAdmin', payload);
}

  deleteCloudKitchen(id:any){
    return this.http.post(this.apiUrl + 'superAdmin/deleteCloudKitchen/'+id ,{ responseType: 'text' })
  }

  getAllManagerList(){
    return this.http.get(this.apiUrl + 'superAdmin/getAllManagers')
  }

 deleteManager(id:any){
  return this.http.post(this.apiUrl + 'superAdmin/deleteManager/' +id ,{ responseType: 'text' })
 }

  getAllCloudeKitchenReview(){
     return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKItchenAndReviews')
   }




}