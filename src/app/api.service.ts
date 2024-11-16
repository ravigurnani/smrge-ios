import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { min, Observable } from 'rxjs';
import { APIResult, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = "http://localhost:8000" //"https://smrge.anujagrawal.co.in"

  constructor(private http: HttpClient) { }

  gen_otp(number: number){
    return this.http.get<APIResult>(this.base_url + "/user/gen_otp_extra", {params: {mobile: number}})
  }

  verify_otp(number: number, ref_id: string, otp: string){
    return this.http.get<APIResult>(this.base_url + "/user/verify_otp_extra",
    {params: {
        mobile: number,
        ref_id: ref_id,
        otp: otp
    }})
  }

  get_all_interests(){
    return this.http.get<APIResult>(this.base_url + "/user/get_all_interests")
  }

  register_user(user: User){
    return this.http.post<APIResult>(this.base_url + "/user/register", user)
  }

  update_socials(data: any){
    return this.http.post<APIResult>(this.base_url + "/user/update_profile", data)
  }

  get_profiles(token: string, lat: number, lon: number, min_age: number, max_age: number, distance: number){
    return this.http.get<APIResult>(this.base_url + "/user/get_profiles", {params: {
        token: token,
        lat: lat,
        lon: lon,
        min_age: min_age,
        max_age: max_age,
        distance: distance
    }})
  }

  get_saved_profiles(token: string){
    return this.http.get<APIResult>(this.base_url + "/user/get_saved_profiles", { params: {
        token: token
    }})
  }

  save_profile(token: string, id: number){
    return this.http.get<APIResult>(this.base_url + "/user/add_smrge", { params: {
        token: token,
        id: id
    }})
  }

  verify_google(token: string){
    return this.http.get<APIResult>(this.base_url + "/user/google_verification", { params: {
        token: token
    }})
  }

  get_user_profile(token: string){
    return this.http.get<APIResult>(this.base_url + "/user/get_user_profile", { params: {
        token: token
    }})
  }
}
