import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [
    '../../../node_modules/keen-slider/keen-slider.min.css',
    './landing.component.scss',
]
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined
  slider: KeenSliderInstance | null = null
  current_slide = 0

  ngOnInit(): void {
    if(localStorage.getItem("token") != null) {
        this.router.navigate(["home"])
        return
    }
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef!.nativeElement, {
        initial: this.current_slide,
        slideChanged: (s) => {
            this.current_slide = s.track.details.rel
            console.log(this.current_slide)
            console.log(s.track.details)
        }
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  go(){
    this.router.navigate(["login"])
  }

}
