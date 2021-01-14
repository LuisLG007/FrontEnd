import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


/* Resources */
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule
  ]
})
export class ResourcesModule { }
