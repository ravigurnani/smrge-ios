import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  constructor(private api: ApiService) { }

  @Input("saved_profiles") saved_profiles: User[] = []

  user: User | null = null

  ngOnInit(): void {
    this.api.get_saved_profiles(localStorage.getItem("token")!).subscribe(
        response => {
            console.log(response)
            this.saved_profiles = response.data
        },
        error => {console.log(error)}
    )
  }

  get_gender_age(dob: string, gender: string){
    var parts = dob.split("/")
    var date = Date.now() - new Date(parts[1] + "-" + parts[0] + "-" + parts[2]).getTime()
    // if (gender)
    return gender[0].toUpperCase() + " / " + (date / 1000 / 3600 / 365.25 / 24 - 1).toPrecision(2)
  }

  profile_click(user: User){
    this.user = user
  }

  close_profile(){
    this.user = null
  }

  redirect(url: string | undefined){
    window.open(url)
  }


}
