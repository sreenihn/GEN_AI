import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_TEST_CASES, RUN_COMMAND } from '../../config/config.apiEndpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {

  constructor(private http: HttpClient) { }

  runCommand(requestObj: any){
    return this.http.post(RUN_COMMAND,requestObj).pipe(map(res => res || {}))
  }

  getUpdatedTestcases(){
    return this.http.get(GET_TEST_CASES).pipe(map(res => res || []))
  }

}
