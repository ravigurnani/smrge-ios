import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MobileLoginComponent } from './mobile-login/mobile-login.component';
import { MobileOtpComponent } from './mobile-otp/mobile-otp.component';
import { RegNameComponent } from './reg-name/reg-name.component';
import { RegDescriptionComponent } from './reg-description/reg-description.component';
import { RegPhotoComponent } from './reg-photo/reg-photo.component';
import { RegHobbiesComponent } from './reg-hobbies/reg-hobbies.component';
import { ProfileComponent } from './home/profile/profile.component';
import { PeopleComponent } from './home/people/people.component';
import { MatchesComponent } from './home/matches/matches.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { RegSocialComponent } from './reg-social/reg-social.component';
import { LandingComponent } from './landing/landing.component';
import { SocialComponent } from './social/social.component';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MobileLoginComponent,
    MobileOtpComponent,
    RegNameComponent,
    RegDescriptionComponent,
    RegPhotoComponent,
    RegHobbiesComponent,
    ProfileComponent,
    PeopleComponent,
    MatchesComponent,
    RegSocialComponent,
    LandingComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // SocialLoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
