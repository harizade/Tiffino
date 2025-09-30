import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getMeals() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:9090/';
  constructor(private http: HttpClient, private router: Router) {}

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

  addMenu(){
    return this.http.get(this.apiUrl + 'manager/getAllCuisinesAndMeals');
  }


  addOrRemoveMeal(mealId: number):Observable<any> {
  return this.http.post(this.apiUrl + 'manager/addOrRemoveMeals/' + mealId, {}, { responseType: 'text' } );
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

  // getAllSubscriptionPlans() {
  //   return this.http.get(this.apiUrl + 'superAdmin/getAllSubscribedUser', {responseType: 'text'});
  // }

  getAllSubscriptionPlans() {
  return this.http.get<any[]>(this.apiUrl + 'superAdmin/getAllSubscribedUser');
}


  deleteSubscriptionPlan(id: any) {
    return this.http.delete(
      this.apiUrl + 'superAdmin/deleteSubscriptionPlan/' + id,{ responseType: 'text' });
  }

  addCuisine(data: any) {
    return this.http.post(
      this.apiUrl + 'superAdmin/saveOrUpdateCuisine',data,{ responseType: 'text' });
  }

  getAllCuisines() {
    return this.http.get(this.apiUrl + 'superAdmin/getAllCuisines');
  }

  addMeals(data: any) {
    return this.http.post(this.apiUrl + 'superAdmin/saveOrUpdateMeal', data, {responseType: 'text'});
  }

  userRegister(data: any) {
    return this.http.post(this.apiUrl + 'user/register', data, {responseType: 'text'});
  }

  userSubscription(data:any){
    return this.http.post(this.apiUrl + 'user/assignSubscriptionToUser',data)
  }

  cloudeKitchenData(){
    return this.http.get(this.apiUrl + 'manager/getDataOfCloudKitchen');
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

  addDeliveryPerson(data:any){
    return this.http.post(this.apiUrl + 'superAdmin/saveOrUpdateDeliveryPerson',data,{responseType: 'text'})
  }

  getCloudKitchenDeliveryPerson() {
  return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKitchenData', { withCredentials: true });
  }
 
  getAllOrder() {
    return this.http.get<any[]>(`${this.apiUrl}manager/getAllOrders`);
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

  pikUpOrder(deliveryId: string) {
   return this.http.post(`${this.apiUrl}delivery-person/${deliveryId}/pickup`, {} ,{responseType:'text'});
  }

  deliverOrder(deliveryId: string) {
   return this.http.post(`${this.apiUrl}delivery-person/${deliveryId}/deliver`, {} ,{responseType:'text'});
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
  
   getAllCloudeKitchenReview(){
     return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKItchenAndReviews')
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

 getCloudKitchenList(){
  return this.http.get(this.apiUrl + 'superAdmin/getAllCloudKitchenData')
 }





}


