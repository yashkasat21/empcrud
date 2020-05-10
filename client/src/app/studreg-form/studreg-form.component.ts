import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studreg-form',
  templateUrl: './studreg-form.component.html',
  styleUrls: ['./studreg-form.component.css']

})

export class StudRegFormComponent implements OnInit {

  studRegForm : FormGroup;

  constructor(
    private http : HttpClient,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.studRegForm = this.fb.group({
      UserName : ['',Validators.required],
      rollno: ['',Validators.required],
      email : ['',Validators.required],
      phno : ['',Validators.required],
      password : ['',Validators.required],
      Confirmpassword : ['',Validators.required]
    });
  }

  reg() {   

    this.http.post('http://localhost:3000/student/studentReg', this.studRegForm.value).subscribe((response: any) => {

      console.log(response);
      alert('Student Registration Successful');

    }, (error) => {

      console.log(error);
      alert('Student Registration Failed');

    });
  }

}
