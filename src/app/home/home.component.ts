import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  pages = [
    {id: 1, title: "People", component: "app-people"},
    {id: 2, title: "Matches", component: "app-matches"},
    {id: 3, title: "Profile", component: "app-profile"}
  ]
  selected_page = this.pages[0]
  profiles: User[] = []
  saved_profiles: User[] = []
  token = ""

  ngOnInit(): void {
    if(localStorage.getItem("token") == null) {
        console.log("No token")
        this.router.navigate(["login"])
        return
    }
    this.token = localStorage.getItem("token")!
    localStorage.setItem("updates_started", "false")
    if(navigator.geolocation){
        navigator.geolocation.watchPosition((position => {
            console.log(position)
            localStorage.setItem("lat", position.coords.latitude.toString())
            localStorage.setItem("lon", position.coords.longitude.toString())
            this.api.update_socials({
                token: this.token,
                last_lat: position.coords.latitude,
                last_lon: position.coords.longitude
            }).subscribe(
                response => {
                    console.log(response)
                },
                error => {console.log(error)}
            )
        }), this.location_error)
    }
    if (localStorage.getItem("distance") == null) {
        localStorage.setItem("distance", "30")
        localStorage.setItem("min_age", "18")
        localStorage.setItem("max_age", "60")
    }
    this.start_updates()
    this.get_saved_profiles()
  }

  change_page(id: number){
    this.selected_page = this.pages[id];
  }

  location_updates(position: GeolocationPosition){
  }
  location_error(error: GeolocationPositionError) {
    console.error(error)
  }

  start_updates(){
    console.log("Here")
    setTimeout(() => {
        this.start_updates()
    }, 5000)
    if (localStorage.getItem("lat") == null) return
    this.api.get_profiles(
        this.token,
        Number(localStorage.getItem("lat")!),
        Number(localStorage.getItem("lon")!),
        Number(localStorage.getItem("min_age")),
        Number(localStorage.getItem("max_age")),
        Number(localStorage.getItem("distance"))
    ).subscribe(
        response => {
            console.log(response)
            this.profiles = response.data
            this.profiles = this.profiles.filter(item => {
                var parts = item.dob.split("/")
                var date = Date.now() - new Date(parts[1] + "-" + parts[0] + "-" + parts[2]).getTime()
                var age = Number((date / 1000 / 3600 / 365.25 / 24 - 1).toPrecision(2))
                if(age < Number(localStorage.getItem("min_age")) || age > Number(localStorage.getItem("max_age"))){
                    return false
                }
                return true
            })
        },
        error => {console.log(error)}
    )
  }

  get_saved_profiles(){
    this.api.get_saved_profiles(this.token).subscribe(
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

}
