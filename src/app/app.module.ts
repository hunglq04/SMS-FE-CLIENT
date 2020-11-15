import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';

// Service
import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/auth-guard.service';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
import { LoadingService } from './loading/loading.service';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { SalonService } from './service/salon.service';
import { StylistService } from './service/stylist.service';
// Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { BookingComponent } from './booking/booking.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductComponent } from './product/product.component';
// Template
import { MatStepperModule, MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
// Social
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { BookingStylistComponent } from './booking-stylist/booking-stylist.component';
import { BookingSalonComponent } from './booking-salon/booking-salon.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    FooterComponent,
    BookingComponent,
    ProductComponent,
    LoadingComponent,
    BookingStylistComponent,
    BookingSalonComponent,
    BookingServiceComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SocialLoginModule
  ],
  providers: [
    AuthenticationService,
    BasicAuthHttpInterceptorService,
    AuthGuardService,
    LoadingService,
    SalonService,
    StylistService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '201743325017-1ise698g5n723en1u6antjv68hogbkb7.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('953543585017412'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
