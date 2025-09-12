import { Component, Input, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meal-image',
  standalone: true,
  imports: [],
  templateUrl: './meal-image.component.html',
  styleUrl: './meal-image.component.css',    
})

export class MealImageComponent  {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public popup: MatDialog ){

  }
}

