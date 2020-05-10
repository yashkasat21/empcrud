import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  

  loginForm: FormGroup;

  constructor(
    private notifyService : NotificationService,
    private route:ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group({
        userName : ['',Validators.required],
        password : ['',Validators.required]
    });
  }

  login(){
    this.http.post('http://localhost:3000/user/login', this.loginForm.value).subscribe((response: any) => {

      console.log(response);
      localStorage.setItem('token',response.token)
      this.notifyService.showSuccess("Logged-In successfully !!", "Login")
      this.router.navigate(['./display']);
    }, (error) => {

      console.log(error);
      this.notifyService.showError("Login Failed", "FAILED")

    });
  }
}