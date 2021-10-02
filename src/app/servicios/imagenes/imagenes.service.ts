import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, Photo, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  items: Observable<any[]>;
  

  constructor(
    private storage: AngularFireStorage,
    private afStore: AngularFirestore) { }

  saveFile(file: Blob, filePath: string) {

    return this.storage.upload(filePath, file);
  }

  public async addNewToGallery(): Promise<Photo> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    return capturedPhoto;
  }


  saveDoc(data: any ) {
    let dbRef: AngularFirestoreCollection<any>;
      dbRef = this.afStore.collection("imagenes_usuarios");
      return dbRef.add(Object.assign({}, data));
  }


  getImagenes(tipo: string): Observable<any> {

    let dbRef: AngularFirestoreCollection<any>; 
    dbRef =  this.afStore.collection('imagenes_usuarios', 
                                      ref => ref.where('tipo', '==', tipo)
                                                .orderBy('fullDate',  "desc"  )
                                    ); 
      return dbRef.valueChanges({ idField: "doc_id" }); 
  }


  getReaccionesImagenes(){
    let dbRef: AngularFirestoreCollection<any>; 
    dbRef =  this.afStore.collection('reacciones', 
                                      ref => ref.orderBy('fullDate',  "desc"  )
                                    );
      return dbRef.valueChanges({ idField: "doc_id" }); 
  }


  getImagenesByUser(usuario_email:string){
    let dbRef: AngularFirestoreCollection<any>; 
      dbRef = this.afStore.collection("imagenes_usuarios", 
                                      ref=> ref.where('usuario',"==",usuario_email)
                                               .orderBy('fullDate',  "desc"  ));
      return dbRef.valueChanges({ idField: "doc_id" }); 
  }

  reaccionar(tipoReaccion:string, usuario_email:string, foto_id:string){
    let now = new Date();
    let dbRef: AngularFirestoreCollection<any>; 
    dbRef = this.afStore.collection("reacciones");
    let data= {
      foto_id: foto_id,
      usuario_email: usuario_email,
      tipo_reaccion: tipoReaccion,
      fullDate: now
    };
  
    return dbRef.add(Object.assign({}, data));
 
  }

   
}

