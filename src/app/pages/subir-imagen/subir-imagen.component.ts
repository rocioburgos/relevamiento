
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagenesService } from 'src/app/servicios/imagenes/imagenes.service';
import { Photo } from '@capacitor/camera';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.scss'],
})
export class SubirImagenComponent implements OnInit {

  @Input() titulo: string;
  mostrarError: boolean;
  habilitar: boolean;
  tipoImagenAsubir: string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  paths: Array<string> = [];
  constructor(private router: Router,
    private camera: Camera,
    private imagenSrv: ImagenesService,
    private authSrv: AuthService,
    private spinner: NgxSpinnerService) {
    this.mostrarError = false;
    this.habilitar = false;
  }

  ngOnInit() {
    this.ShowSpinner();
  }


  tipoImagenSet() {
    //levantar en localstorage
    let imagenJson = localStorage.getItem('tipoAsubir');
    if (imagenJson != null) {
      return (JSON.parse(imagenJson));
    } else {
      return null;
    }
  }

  subirFotos() {

    let tipo = this.tipoImagenSet();
    this.ShowSpinner();
    let now = new Date();
    let fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear();
    let hora = now.getHours() + ":" + now.getMinutes() + ":" + now.getUTCSeconds();
    let imagenesDoc = {
      'usuario': this.authSrv.getCurrentUserLS_email(),
      imagenes: this.paths,
      fecha: fecha,
      hora: hora,
      fullDate: now,
      tipo: tipo.tipo
    };
    this.imagenSrv.saveDoc(imagenesDoc).then((data) => {

      tipo.tipo == 'linda' ? this.router.navigate(['cosasLindas']) : this.router.navigate(['cosasFeas']);
    }).catch(err => {
      this.mostrarError = true;
      console.log(err)
    });
  }


  tomarFoto() {
    this.addPhotoToGallery();
  }

  async addPhotoToGallery() {
    const photo = await this.imagenSrv.addNewToGallery();
    this.uploadPhoto(photo).then(() => {
      this.ShowSpinner();
      this.habilitar = true;
    }
    ).catch((err) => {
      console.log("Error addPhotoToGallery", err);
    });
  }

  private async uploadPhoto(cameraPhoto: Photo) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const filePath = this.getFilePath();

    const uploadTask = this.imagenSrv.saveFile(blob, filePath);

    uploadTask.then(async res => {
      const downloadURL = await res.ref.getDownloadURL();
      if (downloadURL.length > 0) {
        this.paths.push(downloadURL);

        this.paths.forEach(element => {

          console.log("Path imagen: " + element);
        });
      } else {
        console.log("IMAGEN NO CORRECTA  ");
      }
    })
      .catch((err) => {
        console.log("Error al subbir la imagen: ", err);
      });
  }

  getFilePath() {
    return new Date().getTime() + '-test';
  }


  ShowSpinner() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
      setTimeout(() => {
      }, 4000);
    }, 2000);
  }
}
