import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  facebook: string = '';
  profileMessage: string = '';

  ngOnInit() {
    // Load the Facebook SDK for JavaScript asynchronously
    ((d, s, id) => {
      let js: any;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // Initialize the Facebook SDK once it has loaded
    window['fbAsyncInit'] = () => {
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
}
