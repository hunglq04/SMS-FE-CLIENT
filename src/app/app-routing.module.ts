import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingComponent } from './booking/booking.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import {  SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, AuthService} from 'ng4-social-login';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
