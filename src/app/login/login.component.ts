import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }
  loginForm:any ='';
  socialUser:any="";
  isLoggedIn:boolean=false;

  ngOnInit(): void {
    this.initialize_google()
  }

  initialize_google(){
    try{
        google.accounts.id.initialize({
            client_id: "801489613991-qf7et6q1207snfeq9ot6fgs68la2gupb.apps.googleusercontent.com",
            callback: this.handleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true,
            scope: "profile email"

        });
        google.accounts.id.renderButton(
        document.getElementById("google-button"),
            { theme: "outline", size: "large", width: "100%" }
        );
    } catch(_e){
        setTimeout(() => {
            this.initialize_google()
        }, 500)
    }
  }


  mobile(){
    console.log("Here")
    this.router.navigate(["mobile"])
  }

  async handleCredentialResponse(response: any) {
    console.log(response);
    this.api.verify_google(response["credential"]).subscribe(
        response => {
            console.log(response)
            if (response.status == "Success"){
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("name", response.data.name)
                this.router.navigate(["register"])
            }
        },
        error => {console.log(error)}
    )
  }

  onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

}
