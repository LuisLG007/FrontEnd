import { NotificationService } from './../../shared/notification.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NavigationEnd, Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { IResponse } from 'src/app/interfaces/IResponse';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit, OnDestroy {
@HostBinding ('class') componentCssClass: any;
public User : IUsuario = { id: '', correo: '', usuario1: '', contrasena: '', estatus: false, sexo: ''};
public UserLocalStorage : IUsuario = { id: '', correo: '', usuario1: '', contrasena: '', estatus: false, sexo: ''};
public UserData : IUsuario = { id: '', correo: '', usuario1: '', contrasena: '', estatus: false, sexo: ''};
public isChecked: boolean = false;
public isHandset$: Observable<boolean>;
public hide: boolean;
public subscription: Subscription = new Subscription();
public route:string;
public count = 0;
public logos = [
   '../../../assets/logo.png',   
   '../../../assets/logo2.gif',
   '../../../assets/logo3.gif']
public appPages = [   
  {
    title: 'Inicio',
    url: 'inicio',
    icon: 'home'
  },
  {
    title: 'Usuarios',
    url: 'usuarios',
    icon: 'emoji_people'
  }]
constructor(
  private UsuarioService: UsuarioService,
  private NotificationService: NotificationService,
  public breakpointObserver: BreakpointObserver, 
  public OverlayContainer: OverlayContainer,  
  private router: Router
  ) { }
public ngOnInit() {
  this.routeActive(); 
  this.isHandset();
  this.navHide(); 
  this.getUserData();
  this.LocalStorage();
}
public ngAfterViewInit(): void {  
 
}
public ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}

public onSetTheme( event ): void 
{
  if (event.checked) {
    this.OverlayContainer.getContainerElement().classList.add('dark-theme');
    this.componentCssClass = 'dark-theme';
  }else{    
    this.OverlayContainer.getContainerElement().classList.add('light-theme');
    this.componentCssClass = 'light-theme';
  }
}

public isHandset():void
  {
   this.isHandset$ = this.breakpointObserver.observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge
        ]).pipe(
          map((state: BreakpointState) => {
                
            if (state.breakpoints[Breakpoints.XSmall]) {
                //console.log( 'Matches XSmall viewport');
                return true;
            }
            if (state.breakpoints[Breakpoints.Small]) {
                //console.log( 'Matches Small viewport');           
                return true;
            }
            if (state.breakpoints[Breakpoints.Medium]) {
                //console.log( 'Matches Medium viewport');           
                return true;
            }
            if (state.breakpoints[Breakpoints.Large]) {
                //console.log( 'Matches Large viewport');           
                return false;
              }
            if (state.breakpoints[Breakpoints.XLarge]) {
                //console.log( 'Matches XLarge viewport');             
                return false;
            }
          })
        );
  }
  public navHide():void{
   this.subscription.add(
    this.isHandset$.subscribe( data => {
      this.hide = data;      
    })
   );
  }

  public routeActive():void
  {
    this.subscription.add(
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd ){
          this.route = event.url;
          this.route = this.route.replace('/', '')     
          }
        })
    );
  }

  public login():void{
    
      this.UsuarioService.loginUsuario( this.User ).subscribe( (Response: IResponse) => {            
        if ( Response.flag ) {
          
          this.UsuarioService.SetData(Response.data);
          this.UserLocalStorage = this.UsuarioService.GetData();  
          this.UsuarioService.UserData$.emit(this.UserLocalStorage);
          this.router.navigate(['/usuarios']);
          this.NotificationService.SwalAlert("success", "Perfecto", "¡Haz iniciado sesión!");          
        }else{
          this.NotificationService.SwalAlert("info", "¡Atención!", Response.message);
        }
      });  
  }


  private LocalStorage(): void
  {
    this.UserLocalStorage = this.UsuarioService.GetData();  
    
    if ( this.UserLocalStorage != null ) {
      this.UsuarioService.UserData$.emit(this.UserLocalStorage);      
    }
  }

  public getUserData(): void 
  {
    this.subscription.add(
      this.UsuarioService.UserData$.subscribe((Data) => {
        if (Data.length >0) {
          this.UserData = Data[0];
        }           
      })
    );
   
  }


  public logout(): void 
  {
    Swal.fire({
      title: '¿Seguro de Cerrar Sesión?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {  
        this.NotificationService.SnackBar("La sesión ha sido cerrada","¡Hasta luego!");

        this.UsuarioService.RemoveData();

        this.UserData.usuario1 = '';
        this.UserData.correo = '';
        this.UserData.id = '';
        this.UserData.contrasena = '';
        this.UserData.estatus = false;
        this.UserData.sexo = '';
        
        this.UsuarioService.UserData$.emit(this.UserData); 
        this.router.navigate(['/inicio']);
      }
    })
  }
}

