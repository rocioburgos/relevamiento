import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SplashComponent } from './pages/splash/splash.component';
import { CosasFeasComponent } from './pages/cosas-feas/cosas-feas.component';
import { CosasLindasComponent } from './pages/cosas-lindas/cosas-lindas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

import { Camera } from '@ionic-native/camera/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MisFotosComponent } from './pages/mis-fotos/mis-fotos.component';
import { SubirImagenComponent } from './pages/subir-imagen/subir-imagen.component';
import  * as Chart from 'chart.js';
@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SplashComponent,
    CosasFeasComponent,
    CosasLindasComponent,
    ResultadosComponent,
    MisFotosComponent,
    LoginComponent,
    NavbarComponent,
    ResultadosComponent,
    SubirImagenComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule ,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NgxSpinnerModule,

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
