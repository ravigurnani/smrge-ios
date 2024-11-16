import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-name',
  templateUrl: './reg-name.component.html',
  styleUrls: ['./reg-name.component.scss']
})
export class RegNameComponent implements OnInit {

  constructor(private router: Router) { }

  name = ""
  dob = ""
  gender = ""

  ngOnInit(): void {
    if (localStorage.getItem("name") != undefined) this.name = localStorage.getItem("name")!
  }

  register(){
    if (
        (this.name.length < 2) ||
        (this.dob.length < 2) ||
        (this.gender.length < 2)
    ) {
        alert("Please fill all fields to continue")
        return
    }
    var date = this.dob.split("-").reverse().join("/")
    // console.log(this.name)
    // console.log(date)
    // console.log(this.gender)
    localStorage.setItem("name", this.name)
    localStorage.setItem("gender", this.gender)
    localStorage.setItem("dob", date)
    this.router.navigate(["description"])
  }

}
