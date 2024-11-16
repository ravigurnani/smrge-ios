import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mobile-otp',
  templateUrl: './mobile-otp.component.html',
  styleUrls: ['./mobile-otp.component.scss']
})
export class MobileOtpComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  otp = "";

  ngOnInit(): void {
    if (localStorage.getItem("ref_id") == null){
        this.router.navigate(["mobile"])
    }
    if (localStorage.getItem("mobile") == null){
        this.router.navigate(["mobile"])
    }
  }

  check_otp(){
    if (this.otp.length != 6) {
        alert("Please enter the 6 digit OTP to continue")
    }
    this.api.verify_otp(
        Number(localStorage.getItem("mobile")),
        localStorage.getItem("ref_id")!,
        this.otp
    ).subscribe(
        response => {
            console.log(response)
            if (response.status == "Success") {
                localStorage.setItem("verified_mobile", localStorage.getItem("mobile")!)
                this.router.navigate(["register"])
            } else {
                alert("Invalid OTP")
            }
        },
        error => {console.log(error)}
    )
  }

}
