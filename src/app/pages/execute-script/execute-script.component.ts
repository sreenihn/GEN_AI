import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { FrameworkService } from '../../shared/services/framework.service';
import { TableExportUtil } from '../../shared/tableExportUtil';
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
import { NgClass} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StepsComponent } from '../../dialogs/steps/steps.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// import { exec } from 'child-process-ext';
@Component({
  selector: 'app-execute-script',
  standalone: true,
  imports:[RouterOutlet,MatButtonModule,ReactiveFormsModule,MatFormFieldModule,MatTabsModule,
    MatSortModule,MatInputModule,MatIconModule,MatTableModule,MatPaginatorModule,MatTooltipModule,
  FormsModule,NgClass,MatProgressSpinnerModule],
  providers:[FrameworkService],
  templateUrl: './execute-script.component.html',
  styleUrls: ['./execute-script.component.scss'],
})
export class ExecuteScriptComponent implements OnInit {

  url!: string;
  totalCount!: number;
  isTestcaseExecuting: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['testcaseid', 'testcasetitle', 'description', 'expectedoutcome','postconditions','priority','teststeps'];
  src!: string ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private http: HttpClient, private frameworkService: FrameworkService,public dialog: MatDialog) { }

  ngOnInit() {
  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getUpdatedTestcases(){
    this.frameworkService.getUpdatedTestcases().subscribe((response: any) => {
      console.log(response);
      console.log(response?.testCases);
      const normalizeKeys = (obj: any) => {
        const normalizedObject: any = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            normalizedObject[key.replace(' ','').toLowerCase()] = obj[key];
          }
        }
        return normalizedObject;
      };
      let res = response?.testCases ? response?.testCases : response
      this.totalCount = response?.testCases ? response?.testCases.length : response.length
      this.src = IMAGE
      this.dataSource.data = res.map((item: any) => normalizeKeys(item));
    })
  }

  openSteps(step: []){
    this.dialog.open(StepsComponent,{
      data: step,width: '90vw',maxWidth:'90vw'
    })
  }

  exportExcel(){
    TableExportUtil.exportExcel(this.dataSource.data,'updated-test-cases',true)
  }

  runCommand(){
    this.isTestcaseExecuting = true;
    this.src = '';
    this.dataSource.data = []
    const obj = {
      "command": "npm run generateTestCases" ,
      "url":  this.url
    };
    this.frameworkService.runCommand(obj).subscribe((response) => {
      console.log(response);
      if(response){
        this.getUpdatedTestcases()
        this.isTestcaseExecuting = false
      }
    },(error) => {
      console.log(error);
      this.isTestcaseExecuting = false
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
