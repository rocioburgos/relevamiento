import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {



  ngOnInit() {}
  constructor(public router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('home');
    },3000); 
  }
}
