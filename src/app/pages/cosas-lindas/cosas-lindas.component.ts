import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';
import { ImagenesService } from 'src/app/servicios/imagenes/imagenes.service';
 
export interface Relevamiento{
  emailUsuario:string;
  fecha:string;
  pathImagen:string;
}
@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.component.html',
  styleUrls: ['./cosas-lindas.component.scss'],
})
export class CosasLindasComponent implements OnInit {

  titulo='Cosas lindas'; 

  contact: Array<Object>;
  constructor(
    private router:Router ,
    private imagenSrv:ImagenesService 
    ) { }

  ngOnInit() {
    this.obtenerImagenes();
  } 
  
  mostrarResultados(){
    this.router.navigate(['resultados']);
  }

  tomarFoto(){ 
    localStorage.removeItem('tipoAsubir');
    localStorage.setItem('tipoAsubir', JSON.stringify({tipo:'linda'})); 
    this.router.navigate(['upload']);
  } 
  
  obtenerImagenes(){  
    //Traigo productos 
    this.imagenSrv.getImagenes('linda').subscribe( data => {
      this.contact =  data; 
    }, err => { console.log(err) } ); 
  }
  
}
