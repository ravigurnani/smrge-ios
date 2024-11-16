import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models';
declare var rSlider: any;

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(private api: ApiService) { }

  @Input("profiles") profiles: User[] = []

//   profiles: User[] = []
  user: User | null = null

  ngOnInit(): void {
    console.log("Initiated")
    var mySlider = new rSlider({
        target: '#age',
        values: Array.from({length: 83}, (_, index) => index + 18),
        range: true, // range slider
        labels: false,
        set: [18, 60],
        onChange: ((values: any) => {
            console.log(values)
            localStorage.setItem("min_age", values.split(",")[0])
            localStorage.setItem("max_age", values.split(",")[1])
        })
    });
    var mySlider2 = new rSlider({
        target: '#distance',
        values: Array.from({length: 100}, (_, index) => index + 1),
        labels: false,
        set: [30],
        onChange: ((values: any) => {
            console.log(values)
            localStorage.setItem("distance", values)
        })
    });
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

  save_profile(id: number){
    this.api.save_profile(localStorage.getItem("token")!, id).subscribe(
        response => {
            console.log(response)
            if (response.status == "Success"){
                this.user = null
                this.profiles = this.profiles.filter(item => {return item.id != id})
            }
        },
        error => {console.log(error)}
    )
  }

}
