import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Interest, User } from '../models';

@Component({
  selector: 'app-reg-hobbies',
  templateUrl: './reg-hobbies.component.html',
  styleUrls: ['./reg-hobbies.component.scss']
})
export class RegHobbiesComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  hobbies = [
    {name: "Sports", items: ["Cricket", "Football", "Basketball", "Swimming"]},
    // {name: "Culture", items: ["Art", "Design", "Theatre"]},
  ]
  all_interests: Interest[] = []
  selected: Interest[] = []

  ngOnInit(): void {
    this.api.get_all_interests().subscribe(
        response => {
            console.log(response)
            this.all_interests = response.data
            this.hobbies.pop()
            for(let hobby of response.data) {
                console.log(hobby)
                let category = this.hobbies.find(item => {return item.name == hobby.category.name})
                if(category == undefined){
                    this.hobbies.push({name: hobby.category.name, items: [hobby.name]})
                } else {
                    category.items.push(hobby.name)
                }
            }
        },
        error => {console.log(error)}
    )
  }

  select(name: string){
    var interest = this.selected.find(item => {return item.name == name})
    console.log(interest)
    if (interest == undefined){
        // let category = this.all_interests.find(item => item.items.includes(name))
        var int = this.all_interests
        this.selected.push(this.all_interests.find(i => {return i.name == name})!)
    } else {
        this.selected = this.selected.filter(i => {return i.name != name})
    }
    console.log(this.selected)
  }

  is_selected(name: string){
    return !(this.selected.find(item => {return item.name == name}) == undefined)
  }

  submit(){
    let photos = JSON.parse(localStorage.getItem("photos")!)
    if (localStorage.getItem("verified_mobile") == undefined) {
        var user: User = {
            name: localStorage.getItem("name")!,
            gender: localStorage.getItem("gender")!,
            dob: localStorage.getItem("dob")!,
            description: localStorage.getItem("description")!,
            email: localStorage.getItem("email")!,
            interests: this.selected,
            profile1: (photos[0].location.length > 5)? photos[0].location : null,
            profile2: (photos[1].location.length > 5)? photos[1].location : null,
            profile3: (photos[2].location.length > 5)? photos[2].location : null,
        }
    }else{
        var user: User = {
            name: localStorage.getItem("name")!,
            gender: localStorage.getItem("gender")!,
            dob: localStorage.getItem("dob")!,
            description: localStorage.getItem("description")!,
            mobile: localStorage.getItem("verified_mobile")!,
            interests: this.selected,
            profile1: (photos[0].location.length > 5)? photos[0].location : null,
            profile2: (photos[1].location.length > 5)? photos[1].location : null,
            profile3: (photos[2].location.length > 5)? photos[2].location : null,
        }
    }

    this.api.register_user(user).subscribe(
        response => {
            console.log(response)
            if (response.status == "Success"){
                localStorage.setItem("token", response.data)
                this.router.navigate(["social"])
            } else{
                alert("There was some error, see logs for details")
                console.log(response)
            }
        },
        error => {
            console.log(error)
            alert("There was some error, see logs for details")
        }
    )
  }

}
