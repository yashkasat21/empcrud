import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css']
})
export class ForgotFormComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      userName : ['',Validators.required],
      phno : ['',Validators.required],
      password : ['',Validators.required],
      Confirmpassword : ['',Validators.required]
  });
  }

  forgot(){

    if(this.checkpass()){
        this.http.post('http://localhost:3000/user/forgot', this.forgotForm.value).subscribe((response: any) => {

    
           console.log(response);
          alert('Forgot  Successful');
        }, (error) => {

              console.log(error);
              alert('forgot Failed');
                      
        })
      }
      else
      alert("Passwords must be same...RELOAD AND TRY AGAIN");
    }

   
  checkpass(){
 
      var x = (<HTMLInputElement>document.getElementById("pass1")).value;
      var y = (<HTMLInputElement>document.getElementById("pass2")).value;
      if(x != y)
      {
          return false;
          
      }else
      return true;
  }


}
