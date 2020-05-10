import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.css']
})
export class DisplayFormComponent implements OnInit {

  studentList = [];
  totalRecords: String;
  page:Number=1;

  constructor( 
    private route:ActivatedRoute,
    private router:Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.http.get('http://localhost:3000/user/display',).subscribe((response: any) => {

      this.studentList = response.user_disp;
      this.totalRecords = response.user_disp.length;

    }, (error) => {

      if(error.status === 401){
        this.router.navigate(['./login']);
      }

    });
  }

  delete(id){
     console.log(id);
    this.http.delete('http://localhost:3000/user/delete/' + id).subscribe((response: any) => {
    
      console.log(response);
      alert("Deleted Successfully");
    }, (error) => {

      console.log(error);
      alert('Display Failed');

    });
  }

  update( id ){
    console.log("update");
    this.router.navigate(['./update'],id);
  }

  regUser(){
    this.router.navigate(['./registration']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./login']);
  }

}
