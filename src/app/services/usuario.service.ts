import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private URL_API: String = 'https://localhost:44362/api/Usuarios/';


  public loginUsuario(Usuario: IUsuario):Observable<IResponse>
  {
    Usuario.id = "00000000-0000-0000-0000-000000000000";    
    return this.http.post<IResponse>(this.URL_API + "login", Usuario);
  }


  public getUsuarios():Observable<IResponse>
  {
    return this.http.get<IResponse>(this.URL_API + "ObtenerUsuarios");
  }

  public postUsuario(Usuario: IUsuario):Observable<IResponse>
  {
    Usuario.id = "00000000-0000-0000-0000-000000000000";
    
    return this.http.post<IResponse>(this.URL_API + "CrearUsuario", Usuario);
  }

  public putUsuario(Usuario: IUsuario):Observable<IResponse>
  {
    return this.http.put<IResponse>(this.URL_API + "EditarUsuario", Usuario);
  }

  public deleteUsuario(Usuario: IUsuario):Observable<IResponse>
  {
    return this.http.post<IResponse>(this.URL_API + "EliminarUsuario", Usuario);
  }

  public UserData$ = new EventEmitter<IUsuario>();
  public SetData(User: IUsuario): void
  {
    localStorage.setItem('user', JSON.stringify(User));
  }

  public GetData(): IUsuario
  {
    return JSON.parse(localStorage.getItem('user'));    
  }

  public RemoveData(): void
  {
    localStorage.removeItem('user');
  }

}