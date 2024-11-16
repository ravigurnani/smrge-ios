import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-reg-photo',
  templateUrl: './reg-photo.component.html',
  styleUrls: ['./reg-photo.component.scss']
})
export class RegPhotoComponent implements OnInit {

  constructor(private uploader: UploadService, private router: Router) { }

  photos = [
    {id: 0, location: ""},
    {id: 1, location: ""},
    {id: 2, location: ""},
  ]

  ngOnInit(): void {
  }

  get_photo(id: number){
    console.log(id)
    this.open_file_picker(id)
  }

  open_file_picker(id: number){
    let input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.onchange = _this => {
        if(input.files == null) return
        let file = input.files[0];
        console.log(file);
        console.log("Uploading file")
        this.uploader.uploadFile(file, (err: any, data: any) => {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                // return false;
            }
            console.log('Successfully uploaded file.', data);
            this.photos[id].location = data["Location"]
            localStorage.setItem("photos", JSON.stringify(this.photos))
            console.log(this.photos)
            // return true
        })
    };
    input.click();
  }

  submit(){
    if (this.photos[0].location.length + this.photos[1].location.length + this.photos[2].location.length < 10) {
        alert("Please upload atleast one image")
        return
    }
    this.router.navigate(["hobbies"])
  }

}
