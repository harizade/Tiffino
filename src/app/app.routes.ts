import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HelpsComponent } from './Components/helps/helps.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AddManagerComponent } from './Components/add-manager/add-manager.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { AddCloudKitchenComponent } from './Components/add-cloud-kitchen/add-cloud-kitchen.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { SubscriptionComponent } from './Components/subscription/subscription.component';
import { DeliveryPartnerComponent } from './Components/delivery-partner/delivery-partner.component';
import { AddCuisineComponent } from './Components/add-cuisine/add-cuisine.component';
import { AddMealsComponent } from './Components/add-meals/add-meals.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { SubscriberComponent } from './Components/subscriber/subscriber.component';
import { CloudKitchenDataComponent } from './Components/cloud-kitchen-data/cloud-kitchen-data.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { SettingComponent } from './Components/setting/setting.component';
import { OfferComponent } from './Components/offer/offer.component';
import { authGuard, loginGuard, managerGuard } from './gaurds/auth.guard';
import { ViewSubscriptionComponent } from './Components/view-subscription/view-subscription.component';
import { ManagerLoginComponent } from './Components/manager-login/manager-login.component';
import { DeliveryPartnerDashbordComponent } from './Components/delivery-partner-dashbord/delivery-partner-dashbord.component';
import { UserSubscriptionComponent } from './Components/user-subscription/user-subscription.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';

export const routes: Routes = [
    
    {"path":"navbar",component:NavbarComponent},
    {"path":"",component:HomeComponent},
    {"path":"footer",component:FooterComponent},
    {"path":"helps",component:HelpsComponent},
    {"path":"login",component:LoginComponent, canActivate:[loginGuard]},
    {"path":"create_account",component:CreateAccountComponent},
    // {"path":"admin_login",component:AdminLoginComponent},
    {"path":'view_subscription',component:ViewSubscriptionComponent},
    // { path:'manager/manager_login',component:ManagerLoginComponent},

    {"path":"delivery_partner_dashbord",component:DeliveryPartnerDashbordComponent},
    {"path":"user_subscription",component:UserSubscriptionComponent},
    {"path":"forgot_password",component:ForgotPasswordComponent},

    {
      "path":"manager",
      canActivate:[managerGuard],
      component:ManagerComponent,
      children:[
      { path:'orders',component:OrdersComponent},
      { path:'cloud_kitchen_data',component:CloudKitchenDataComponent},       
      ]
    },
   {
      path: 'admin',
    component: AdminComponent, 
    canActivate: [authGuard],
    children: [
      // { path:''}
      { path:'add-manager',component:AddManagerComponent},
      { path :'reviews',component:ReviewsComponent},
      { path:'add_cloud_kitchen',component:AddCloudKitchenComponent},
      { path:'subscription',component:SubscriptionComponent},
      { path:'delivery_partner',component:DeliveryPartnerComponent},
      { path:'add_cuisine',component:AddCuisineComponent},
      { path:'add_meals',component:AddMealsComponent},
      { path:'subscriber',component:SubscriberComponent},
      { path:'setting',component:SettingComponent},
      { path:'offer',component:OfferComponent},
      { path:'view_subscription',component:ViewSubscriptionComponent}
    ]
   }
   
];
