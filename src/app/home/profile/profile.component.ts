import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private api: ApiService) { }

  user: User | null = null


  ngOnInit(): void {
    this.api.get_user_profile(localStorage.getItem("token")!).subscribe(
        response => {
            console.log(response)
            this.user = response.data
        },
        error => {console.log(error)}
    )
  }



  get_gender_age(dob: string, gender: string){
    var parts = dob.split("/")
    var date = Date.now() - new Date(parts[1] + "-" + parts[0] + "-" + parts[2]).getTime()
    // if (gender)
    return gender[0].toUpperCase() + gender.slice(1) + " / " + (date / 1000 / 3600 / 365.25 / 24 - 1).toPrecision(2)
  }

  redirect(url: string | undefined){
    window.open(url)
  }

}
