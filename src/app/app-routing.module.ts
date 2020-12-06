import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingComponent } from './booking/booking.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent} from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { CheckoutComponent} from './checkout/checkout.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: BookingHistoryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'service/:id', component: ServiceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
