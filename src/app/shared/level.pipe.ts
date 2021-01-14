import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level'
})
export class LevelPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 50 ) {
      return 'warn';
    } else if(value <= 100 && value > 50){
      return 'accent';
    } else if( value > 100){
      return 'primary';
    }
  }

}
