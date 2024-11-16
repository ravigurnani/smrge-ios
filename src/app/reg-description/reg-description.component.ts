import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-description',
  templateUrl: './reg-description.component.html',
  styleUrls: ['./reg-description.component.scss']
})
export class RegDescriptionComponent implements OnInit {

  constructor(private router: Router) { }

  description = ""

  ngOnInit(): void {
  }

  register(){
    console.log(this.description)
    localStorage.setItem("description", this.description)
    this.router.navigate(["addphoto"])
  }

}
