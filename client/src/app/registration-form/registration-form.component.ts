import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm : FormGroup;

  constructor(
    private http : HttpClient,
    private fb : FormBuilder
    ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      UserName : ['',Validators.required],
      email : ['',Validators.required],
      phno : ['',Validators.required],
      password : ['',Validators.required],
      Confirmpassword : ['',Validators.required]
    });
  }

  register() {   

    this.http.post('http://localhost:3000/user/registration', this.registrationForm.value).subscribe((response: any) => {

      console.log(response);
      alert('Registration Successful');

    }, (error) => {

      console.log(error);
      alert('Registration Failed');

    });
  }
}