import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() titulo:string; 

  constructor(private authSrv:AuthService, private router:Router) { }

  ngOnInit() {}

  cerrarSesion(){
    try {
      this.authSrv.LogOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    } 
  }

  misFotos(){
    this.router.navigate(['misFotos']);
  }

 


}
