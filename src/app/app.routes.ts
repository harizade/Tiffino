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
import { SettingComponent } from './Components/setting/setting.component';
import { OfferComponent } from './Components/offer/offer.component';
import { authGuard, loginGuard, managerGuard } from './gaurds/auth.guard';
import { ViewSubscriptionComponent } from './Components/view-subscription/view-subscription.component';
import { DeliveryPartnerDashbordComponent } from './Components/delivery-partner-dashbord/delivery-partner-dashbord.component';
import { UserSubscriptionComponent } from './Components/user-subscription/user-subscription.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { MenuComponent } from './Components/menu/menu.component';
import { CartComponent } from './Components/cart/cart.component';
import { GiftCardComponent } from './Components/gift-card/gift-card.component';
import { PlaceOrderComponent } from './Components/place-order/place-order.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { TrackOrderComponent } from './Components/track-order/track-order.component';
import { ManagerListComponent } from './Components/manager-list/manager-list.component';
import { CloudKitchenListComponent } from './Components/cloud-kitchen-list/cloud-kitchen-list.component';
import { SearchFilterComponent } from './Components/search-filter/search-filter.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { StateMealsComponent } from './Components/state-meals/state-meals.component';
import { SearchFilterUserComponent } from './Components/search-filter-user/search-filter-user.component';
import { CancelOrderComponent } from './Components/cancel-order/cancel-order.component';
import { ViewSummaryComponent } from './Components/view-summary/view-summary.component';

export const routes: Routes = [
    
    {"path":"navbar",component:NavbarComponent},
    {"path":"",component:HomeComponent},
    {"path":"footer",component:FooterComponent},
    {"path":"helps",component:HelpsComponent},
    {"path":"login",component:LoginComponent, canActivate:[loginGuard]},
    {"path":"create_account",component:CreateAccountComponent},
    {"path":'view_subscription',component:ViewSubscriptionComponent},
    {"path":"delivery_partner_dashbord",component:DeliveryPartnerDashbordComponent},
    {"path":"user_subscription",component:UserSubscriptionComponent},
    {"path":"forgot_password",component:ForgotPasswordComponent},
    {"path":'subscription',component:SubscriptionComponent},
    {"path":'cart',component:CartComponent},
    {"path":'gift_card',component:GiftCardComponent},
    {"path":'place_order',component:PlaceOrderComponent},
    {"path":'myOrders',component:MyOrdersComponent},
    {"path":'trackOrder/:orderId',component:TrackOrderComponent},
    {"path":'myProfile',component:MyProfileComponent},
    {"path":'editUser',component:EditUserComponent},
    {"path":'offer',component:OfferComponent},
    {"path":'StateMeals/:stateName',component:StateMealsComponent},
    {"path":'searchfilterUser',component:SearchFilterUserComponent},
    {"path":'cancelOrder',component:CancelOrderComponent},

    {
      "path":"manager",
      canActivate:[managerGuard],
      component:ManagerComponent,
      children:[
      { path:'orders',component:OrdersComponent},
      { path:'cloud_kitchen_data',component:CloudKitchenDataComponent}, 
      { path:'menu',component:MenuComponent},
      { path:'viewSummary',component:ViewSummaryComponent},
      ]
    },
   {
      path: 'admin',
    component: AdminComponent, 
    canActivate: [authGuard],
    children: [
      { path:'add-manager',component:AddManagerComponent},
      { path :'reviews',component:ReviewsComponent},
      { path:'add_cloud_kitchen',component:AddCloudKitchenComponent},
      { path:'delivery_partner',component:DeliveryPartnerComponent},
      { path:'add_cuisine',component:AddCuisineComponent},
      { path:'add_meals',component:AddMealsComponent},
      { path:'subscriber',component:SubscriberComponent},
      { path:'setting',component:SettingComponent},
      { path:'view_subscription',component:ViewSubscriptionComponent},
      { path:'manager_list',component:ManagerListComponent},
      { path:'cloudKitchen_list',component:CloudKitchenListComponent},
      { path:'searchFilter',component:SearchFilterComponent}
    ]
   }
   
];
