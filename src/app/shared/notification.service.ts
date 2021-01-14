import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public MatSnackBar: MatSnackBar) { }

  
  public async SnackBar (text: string, action: string)
  {
    await this.MatSnackBar.open(text, action, {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  }

  public SwalAlert(icon ,title, text){
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1600
    })
  }
}
