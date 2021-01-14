import { Component, Inject, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//Interface
import { IResponse } from './../../../interfaces/IResponse';
import { IUsuario } from './../../../interfaces/IUsuario';
//Services
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificationService } from 'src/app/shared/notification.service';
//extras
import { Subscription } from 'rxjs';
import { MustMatch } from 'src/app/shared/must-match.validator';
@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudUsersComponent implements OnInit, AfterViewInit,  OnDestroy {
  /*******************************************************************************************************************************************************/
   public myForm: FormGroup;
   public action: boolean;
   public User : IUsuario = { id: '', correo: '', usuario1: '', contrasena: '', estatus: true, sexo: ''};
   public showDetails: boolean;
   public pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
   private Subscription: Subscription = new Subscription();
  /*******************************************************************************************************************************************************/
  constructor(
    private formBuilder: FormBuilder,
    private UsuarioService: UsuarioService,
    private NotificationService: NotificationService,
    public dialogRef: MatDialogRef<CrudUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public request: IResponse) { }

    public ngOnInit(): void {
      this.onLoad();    
      this.buildForm(); 
    }      
    
    public ngAfterViewInit(): void {     
    }
    
    public ngOnDestroy(): void {
      if ( this.Subscription ) {
        this.Subscription.unsubscribe();
      }
    }
/*******************************************************************************************************************************************************/
private onLoad(): void {
  if ( this.request.message == "Update" ) {
    this.action = true;
    setTimeout(() => {
      this.User = this.request.data;         
      this.loadDataForm();
    }, 500);
  }else{
    this.action = false;
    this.buildForm();
  }
}
private loadDataForm()
{
this.myForm.controls['id'].setValue(this.User.id);
this.myForm.controls['correo'].setValue(this.User.correo);
this.myForm.controls['usuario1'].setValue(this.User.usuario1);
this.myForm.controls['contrasena'].setValue(this.User.contrasena);
this.myForm.controls['confirmPassword'].setValue(this.User.contrasena);
this.myForm.controls['estatus'].setValue(this.User.estatus);
this.myForm.controls['sexo'].setValue(this.User.sexo);

}
/*******************************************************************************************************************************************************/

public onSubmit($event: Event): void {
  if ( this.User.id && this.myForm.valid ) {        
    this.Subscription.add(
      this.UsuarioService.putUsuario( this.myForm.value ).subscribe( (Response: IResponse) => {
        if ( Response.flag ) {
          this.NotificationService.SwalAlert("success", "Perfecto", "¡Los datos han sido actualizados con éxito!");
        }
      })
    );
  } else if(this.myForm.valid) {

    this.Subscription.add(
      this.UsuarioService.postUsuario( this.myForm.value ).subscribe( (Response: IResponse) => {            
        if ( Response.flag ) {
          this.NotificationService.SwalAlert("success", "Perfecto", "¡Los datos han sido guardados con éxito!");
        }else{
          this.NotificationService.SwalAlert("info", "¡Atención!", Response.message);
        }
      })          
    );
  } else {
    this.myForm.markAllAsTouched();
    this.NotificationService.SnackBar('Debes llenar todos los campos requeridos','Alerta');
  }
}
/*******************************************************************************************************************************************************/
public clearForm(): void
{
  this.buildForm();
}
private buildForm(): void
{
  this.myForm = this.formBuilder.group({
    id:[''],
    usuario1:['', [Validators.required, Validators.minLength(7)]],
    correo: ['', [Validators.required, 
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]],
    contrasena: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
    confirmPassword:  ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,20}$/)]],
    estatus:['', [Validators.required]],
    sexo:['', [Validators.required]],
 
  },  { validator: MustMatch('contrasena', 'confirmPassword') }
  );
}

get f() { return this.myForm.controls; }  
}
