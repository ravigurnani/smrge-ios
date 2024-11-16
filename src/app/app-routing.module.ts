import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MobileLoginComponent } from './mobile-login/mobile-login.component';
import { MobileOtpComponent } from './mobile-otp/mobile-otp.component';
import { RegDescriptionComponent } from './reg-description/reg-description.component';
import { RegHobbiesComponent } from './reg-hobbies/reg-hobbies.component';
import { RegNameComponent } from './reg-name/reg-name.component';
import { RegPhotoComponent } from './reg-photo/reg-photo.component';
import { RegSocialComponent } from './reg-social/reg-social.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "mobile", component: MobileLoginComponent },
    { path: "otp", component: MobileOtpComponent },
    { path: "register", component: RegNameComponent },
    { path: "description", component: RegDescriptionComponent },
    { path: "addphoto", component: RegPhotoComponent },
    { path: "hobbies", component: RegHobbiesComponent },
    { path: "social", component: RegSocialComponent },
    { path: "home", component: HomeComponent },
    { path: "landing", component: LandingComponent },
    { path: "", redirectTo: "landing", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
