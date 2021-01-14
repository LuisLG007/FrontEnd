import { UsuarioService } from './../../services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public User: any;
  constructor(private UsuarioService: UsuarioService, private route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.User = this.UsuarioService.GetData();
      if ( this.User != null ) {
        this.UsuarioService.UserData$.emit(this.User);        
        return true;      
      } else {
        this.User = null;       
        this.route.navigate(['/inicio']);
        return false;
      }
    
  }
  
}
