import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email:string;
  clave:string;
  show_error:boolean=false; //
  descripcion_error:string='';
  constructor(
    private  authSrv: AuthService 
    ,private router: Router

  ) { 
    
    this.email= '';
    this.clave='';
  }

  ngOnInit() {}

  autocompletar(){
    this.clave='123456';
    this.email='pepe@gmail.com';
  }


  async ingresar(){
   
    try {
      const user=  await this.authSrv.loginUser(this.email, this.clave);
        if(user){
 
            localStorage.setItem('usuario_relevamiento', JSON.stringify ({'email': this.email,  'sesion':'activa'  }));
 
            this.router.navigate(['/home']);
        } 
    

    } catch (error) {

      this.show_error= true;
      this.descripcion_error='La clave o email no coinciden. Vuelva a intentar.'
      console.log(error);
    }
  }

}
