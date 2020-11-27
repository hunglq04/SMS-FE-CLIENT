import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingComponent } from './booking/booking.component';
import { ProductComponent } from './product/product.component';
import { CartComponent} from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: BookingHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
