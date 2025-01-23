import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-execute-script',
  standalone: true,
  imports:[MatButtonModule],
  templateUrl: './execute-script.component.html',
  styleUrls: ['./execute-script.component.scss']
})
export class ExecuteScriptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
