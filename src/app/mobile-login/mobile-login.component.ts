import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }
  number = ""

  ngOnInit(): void {
  }

  send_otp(){
    console.log(this.number)
    if (true){
        if(Number.isNaN(this.number)) {
            alert("Please enter a valid mobile number to continue")
            return
        }
        this.api.gen_otp(+this.number).subscribe(
            response => {
                console.log(response)
                if (response.status == "Success") {
                    localStorage.setItem("mobile", this.number)
                    localStorage.setItem("ref_id", response.data)
                    this.router.navigate(["otp"])
                }
            },
            error => {
                console.error(error)
            }
        )
    } else {
        alert("Please enter a valid mobile number to continue")
    }
  }

}
