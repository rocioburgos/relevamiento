import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ImagenesService } from 'src/app/servicios/imagenes/imagenes.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.component.html',
  styleUrls: ['./cosas-feas.component.scss'],
})
export class CosasFeasComponent implements OnInit {

  titulo = 'Cosas Feas'
  contact: Array<any>;
  reacciones: Array<any>;
  constructor(
    private router: Router,
    private imagenSrv: ImagenesService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.obtenerImagenes();
    this.cargarReacciones();
  }

  mostrarResultados() {
    this.router.navigate(['resultados']);
  }


  tomarFoto() {
    localStorage.removeItem('tipoAsubir');
    localStorage.setItem('tipoAsubir', JSON.stringify({ tipo: 'fea' }));

    this.router.navigate(['upload']);
  }


  obtenerImagenes() {
    //Traigo productos
    this.imagenSrv.getImagenes('fea').subscribe(data => {
      this.contact = data;
    }, err => { console.log(err) });
  }


  like(tipoReaccion: string, foto_id: string) {
    let usuario_email = this.authSrv.getCurrentUserLS_email();
    this.imagenSrv.reaccionar(tipoReaccion, usuario_email, foto_id);
  }

  getUltimaReaccion() { 
    this.contact.forEach(publicacion => {
      this.reacciones.forEach(reaccion => {
        if (publicacion.doc_id == reaccion.doc_id) {
          console.log(publicacion.doc_id + " - "+reaccion.tipo_reaccion)
        }
      }); 
    }); 
  }

  cargarReacciones(){
    this.imagenSrv.getReaccionesImagenes().subscribe(react => {
      this.reacciones = react;
      console.log(this.reacciones);
    });
  }
}
