import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

declare var FB: any;

@Component({
  selector: 'app-reg-social',
  templateUrl: './reg-social.component.html',
  styleUrls: ['./reg-social.component.scss']
})
export class RegSocialComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  facebook: string  = "";
  instagram: string  = "";
  twitter: string  = "";
  linkedin: string  = "";
  profileMessage: string = '';

  ngOnInit(): void {
    ((d, s, id) => {
        let js: any;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (fjs && fjs.parentNode) {
            fjs.parentNode.insertBefore(js, fjs);
        } else {
            console.error("Script element not found. Ensure your document has at least one <script> tag.");
        }
        
      })(document, 'script', 'facebook-jssdk');

      // Initialize the Facebook SDK once it has loaded
      (window as any).fbAsyncInit = () => {
        FB.init({
          appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
          xfbml: true,
          version: 'v17.0' // Replace with the latest version of the Graph API
        });
      };
    }

    

facebookLogin() {
    FB.login((response: any) => {
      if (response.authResponse) {
        // User logged in; fetch profile details
        FB.api('/me', { fields: 'name,link' }, (profileResponse: any) => {
          this.facebook = profileResponse.link;
          this.profileMessage = `Hello, ${profileResponse.name}. Profile URL loaded successfully.`;
        });
      } else {
        // User cancelled login
        this.profileMessage = 'Login cancelled or not fully authorized.';
      }
    }, { scope: 'public_profile,email' }); // Request necessary permissions
  }

  instaHelp() {
    //alert(" 1. Open the instagram app\n 2. Click on the profile tab\n 3. Click Share profile\n 4. Copy link. ");
    //return
    const modal = document.getElementById('customAlert');
    const closeBtn = document.getElementById('closeModal');
  
    if (modal && modal.style) {
        modal.style.display = 'flex';
    }
  
    if (closeBtn) {
    closeBtn.onclick = function () {
        if (modal)
        modal.style.display = 'none';
    };
}
  
    window.onclick = function (event) {
      if (event.target === modal) {
        if (modal)
        modal.style.display = 'none';
      }
    };
    }

  submit(){
    if (this.facebook.length + this.instagram.length + this.linkedin.length + this.twitter.length < 5){
        alert("Please enter atleast one valid social media handle to continue")
        return
    }
    var data: any = {
        token: localStorage.getItem("token")
    }
    if (this.facebook.length > 3) {
        localStorage.setItem("facebook", this.facebook)
        data["facebook"] = this.facebook
        data["facebook_active"] = true
        data["facebook_public"] = true
    }
    if (this.instagram.length > 3) {
        localStorage.setItem("instagram", this.instagram)
        data["insta"] = this.instagram
        data["insta_active"] = true
        data["insta_public"] = true
    }
    if (this.twitter.length > 3) {
        localStorage.setItem("twitter", this.twitter)
        data["twitter"] = this.twitter
        data["twitter_active"] = true
        data["twitter_public"] = true
    }
    if (this.linkedin.length > 3) {
        localStorage.setItem("linkedin", this.linkedin)
        data["linkedin"] = this.linkedin
        data["linkedin_active"] = true
        data["linkedin_public"] = true
    }
    this.api.update_socials(data).subscribe(
        response => {
            console.log(response)
            if (response.status == "Success"){
                this.router.navigate(["home"])
            }
        },
        error => {console.log(error)}
    )
  }

}
