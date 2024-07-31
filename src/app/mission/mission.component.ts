import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {Mission} from "./Mission";
import {MissionResult} from "./MissionResult";
import { HttpResponse } from '@angular/common/http';
import { CapacitorHttp } from '@capacitor/core';
import { CapacitorHttpPluginWeb } from '@capacitor/core/types/core-plugins';
import {MyHeaders} from "./MyHeaders";
import {MatTableModule, MatTable} from '@angular/material/table'
import {MatTableDataSource} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
  const datasource1: MissionResult[] = [{name: 'Dave', value: 0}, {name:'Buddy', value: 99}] ;
@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule,  MatTableModule, MatInputModule, MatButtonModule, MatTable],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css'
})
export class MissionComponent {
    constructor(private http: HttpClient ){}
      name = new FormControl('demo');
      password = new FormControl('demo');
  missions!:MissionResult[];
  datasource:MatTableDataSource<MissionResult, MatPaginator> = new MatTableDataSource(this.missions);

  hello!:string;
  status!:any;
  sessionid!:string;
  columnsToDisplay: string[]= ['Name', 'Value'];
  onSubmit(){
    const baseheaders = new HttpHeaders().set('Content-Type','application/json');
    console.log(this.name.value, this.password.value);
    
    //this.http.post<JSON>("http://192.168.69.49:8069/mission2/mission2", {headers:{'Accept': '*','Content-Type': 'application/json'}, responseType: 'json'}).subscribe(response=>{(this.hello=JSON.stringify(response))}); 
      const options = {
        url: 'http://192.168.69.49:8069/web/session/authenticate',
        headers: {'Content-Type': 'application/json'},
        data: {
        "jsonrpc": "2.0",
        "params": {
            "db": "RD",
            "login": 'demo',
            "password": 'demo'
      }
    }
    };
    CapacitorHttp.post(options).then((response)=> {
      console.log(response.headers); 
      //this.sessionid['Set-Cookie']=response.headers['Set-Cookie'];
      console.log(response.headers['Set-Cookie'].split(' ')[0].split('=')[1]);
      this.sessionid = response.headers['Set-Cookie'].split(' ')[0].split('=')[1];
  });
  }
  onSubmit2(){
    const options ={
      url: 'http://192.168.69.49:8069/mission2/mission2/list',
      headers: {'Content-Type': 'application/json', 'session_id':this.sessionid},
      data: {
        "jsonrpc": "2.0",
        "params": {
            "db": "RD",
            "login": 'demo',
            "password": 'demo'
        }
      }
    };
    CapacitorHttp.post(options).then((response)=> {
      console.log(response);
      this.missions= JSON.parse(response.data['result']);
      this.datasource.data = this.datasource.data;
      //this.datasource=new MatTableDataSource(this.missions);
    }
    );
  }
}
 