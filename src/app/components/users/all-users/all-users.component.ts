import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
//Material table
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//Interfaces
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { IResponse } from 'src/app/interfaces/IResponse';
//Components
import { CrudUsersComponent } from '../crud-users/crud-users.component';
//Services
import { NotificationService } from 'src/app/shared/notification.service';
import { UsuarioService } from 'src/app/services/usuario.service';
//Extras
import { Subscription } from 'rxjs';
import { HostListener } from '@angular/core';
//Swal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllUsersComponent implements OnInit, AfterViewInit, OnDestroy {  

  public sortTooltip: string = "Ordenar";
  public sortActive: string = "Ordenar";
  public sortActiveName: string;
  /*******************************************************************************************************************************************************/
  public AllUsers: IUsuario[];
  public DataSource: MatTableDataSource<IUsuario>;  
  public DisplayedColumns: string[] = ['avatar', 'correo', 'usuario1', 'estatus', 'sexo', 'Edit', 'Delete'];
  public DisplayedColumnsUpper: string[] = ['Correo', 'Usuario', 'Estatus', 'Sexo'];
  public loadding = 0;
  public page_size: number = 5
  public page_number: number = 1
  public pageSizeOptions = [5, 10, 20, 50, 100]
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @HostListener('matSortChange', ['$event'])
  
  private Subscription: Subscription = new Subscription();

/*******************************************************************************************************************************************************/
constructor(
  private UsuarioService: UsuarioService,
  private NotificationService: NotificationService,
  private MatDialog: MatDialog) { 
  this.DataSource = new MatTableDataSource(this.AllUsers);
}

public ngOnInit(): void 
{
  this.getAllUsers();
}

public ngAfterViewInit(): void {
  //throw new Error('Method not implemented.');
}
public ngOnDestroy(): void 
{
  this.Subscription.unsubscribe();
}
/*******************************************************************************************************************************************************/
private getAllUsers(): void
  {
    this.Subscription.add(
      this.UsuarioService.getUsuarios().subscribe( User => {        
        this.AllUsers = User.data;        
        this.loadding = this.AllUsers.length;
        this.DataSource = new MatTableDataSource(this.AllUsers);
        this.DataSource.sort = this.sort;
        this.DataSource.paginator = this.paginator;
      })
    );
  }
/*******************************************************************************************************************************************************/
public onCreate(): void
  {
    this.openDialog();
  }

  public onUpdate( content: IUsuario ): void
  {
    this.openDialog( content );
  }

  public onDelete( content : IUsuario ): void
  {
    Swal.fire({
      title: '¿Seguro que desea eliminar el registro?',
      text: "esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D50000',
      cancelButtonColor: '#90A4AE',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Subscription.add(
          this.UsuarioService.deleteUsuario( content ).subscribe( (Response: IResponse) => {
            if ( Response.flag ) {
              this.NotificationService.SwalAlert("success", "Perfecto", "¡Los datos han sido eliminados con éxito!");
              this.getAllUsers();
            }
          })
        );
      }    
    })    
  }
/*******************************************************************************************************************************************************/ 
public openDialog( content?: IUsuario ): void
  {
    const config = {
      data: {
        message: content ? 'Update': 'Create',
        data: content
      }
    }
    const dialogRef = this.MatDialog.open( CrudUsersComponent, config );
    this.Subscription.add(
      dialogRef.afterClosed().subscribe( res => {
      this.getAllUsers();
      content = null;
      })
    );
  }
/*******************************************************************************************************************************************************/   
public sortChange(e): void {
    if (e.direction == "asc") {
      this.sortTooltip = "Ordenado A-Z"
      this.sortActive = "asc"
      this.sortActiveName = e.active;
    } else if(e.direction == "desc"){
      this.sortTooltip = "Ordenado Z-A"
      this.sortActive = "desc";
      this.sortActiveName = e.active;
    } else if (e.direction == "") {
      this.sortTooltip = "Ordenar";
      this.sortActive = "Ordenar";
      this.sortActiveName = e.active;
    }    
  }
  public applyFilter(event: Event): void
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataSource.filter = filterValue.trim().toLowerCase();

    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  public handlePage(e : PageEvent): void
  {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }
  /*******************************************************************************************************************************************************/  
  thetab = {isYellow: true, tabname: 'Hello'}
  ontabChange(event){
    if(event.tab.isActive){
      this.thetab.isYellow = !this.thetab.isYellow;
    }
    // this.thetab.isYellow = !this.thetab.isYellow;
  }
}
