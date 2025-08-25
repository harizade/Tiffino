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

export const routes: Routes = [
    {"path":"navbar",component:NavbarComponent},
    {"path":"",component:HomeComponent},
    {"path":"footer",component:FooterComponent},
    {"path":"helps",component:HelpsComponent},
    {"path":"login",component:LoginComponent},
    {"path":"create_account",component:CreateAccountComponent},
    // {"path":"admin",component:AdminComponent},
    // {"path":"add-manager",component:AddManagerComponent},
   {
      path: 'admin',
    component: AdminComponent, 
    children: [
      { path:'add-manager',component:AddManagerComponent},
      { path :'reviews',component:ReviewsComponent},
      { path:'add_cloud_kitchen',component:AddCloudKitchenComponent},
      { path:'orders',component:OrdersComponent},
      { path:'subscription',component:SubscriptionComponent},
      { path:'delivery_partner',component:DeliveryPartnerComponent},
      { path:'add_cuisine',component:AddCuisineComponent},
      { path:'add_meals',component:AddMealsComponent}
    ]
   }
   
];
