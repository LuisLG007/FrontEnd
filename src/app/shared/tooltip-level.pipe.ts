import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class TooltipLevelPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value == true ) {
      return 'Activo';
    } else if(value == false){
      return 'Inactivo';
    } else {
      return 'Indefinido';
    }
  }
}
