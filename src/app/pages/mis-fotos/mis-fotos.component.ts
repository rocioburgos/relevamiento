import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ImagenesService } from 'src/app/servicios/imagenes/imagenes.service';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {

  titulo:string= 'Mis fotos';
  contact: Array<Object>;
  
  constructor(    private router:Router ,
    private imagenSrv:ImagenesService ,
    private authSrv:AuthService) {}

  ngOnInit() {
    this.obtenerImagenes();
  } 
  
  obtenerImagenes(){ 
     //Traigo productos
     this.imagenSrv.getImagenesByUser(this.authSrv.getCurrentUserLS_email()).subscribe( data => {
       this.contact = data; 
     }, err => { console.log(err) } );
   }
}
