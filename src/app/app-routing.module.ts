import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from './guards/logueado.guard';
import { CosasFeasComponent } from './pages/cosas-feas/cosas-feas.component';
import { CosasLindasComponent } from './pages/cosas-lindas/cosas-lindas.component';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { MisFotosComponent } from './pages/mis-fotos/mis-fotos.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { SplashComponent } from './pages/splash/splash.component';
import { SubirImagenComponent } from './pages/subir-imagen/subir-imagen.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LogueadoGuard]
  },

  {
    path: 'splash',
    component: SplashComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cosasLindas',
    component: CosasLindasComponent
  },
  {
    path: 'cosasFeas',
    component: CosasFeasComponent
  },

  {
    path: 'resultados',
    component: ResultadosComponent
  },
  {
    path: 'upload',
    component: SubirImagenComponent
  }, 
  {
    path: 'misFotos',
    component: MisFotosComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
