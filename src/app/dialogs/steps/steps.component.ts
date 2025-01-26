import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { IMAGE } from '../../config/config.apiEndpoints';
import {JsonPipe, NgClass} from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-steps',
  standalone: true,
    imports:[RouterOutlet,MatButtonModule,ReactiveFormsModule,MatFormFieldModule,MatTabsModule,
      MatSortModule,MatInputModule,MatIconModule,MatTableModule,MatPaginatorModule,MatTooltipModule,
    FormsModule,NgClass,JsonPipe,MatDialogModule],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  steps!: any[];
  constructor(public dialogRef: MatDialogRef<StepsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.steps = data
    }

  ngOnInit() {
  }

}
