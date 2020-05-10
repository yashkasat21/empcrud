import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  updateForm: FormGroup;
  public uid = '';

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb : FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      UserName : ['',Validators.required],
      email : ['',Validators.required],
      phno : ['',Validators.required],
      password : ['',Validators.required],
      Confirmpassword : ['',Validators.required]
  });
  let id = this.route.snapshot.paramMap.get('id');
    this.uid = id;
}

  update(){
    
    const data = {
        id : this.uid,
        UserName : this.updateForm.get('UserName').value,
        email : this.updateForm.get('email').value,
        phno : this.updateForm.get('phno').value,
        password : this.updateForm.get('password').value,
        Confirmpassword : this.updateForm.get('Confirmpassword').value
    };  
    console.log('data',data);

    if(this.checkpass()){
        this.http.post('http://localhost:3000/user/update', data).subscribe((response: any) => {
          
        console.log(response);
          alert('Update Successful');
          this.router.navigate(["./display"])
        }, (error) => {

              console.log(error);
              alert('Update Failed');
                      
        })
      }
      else
      alert("Passwords must be same...RELOAD AND TRY AGAIN");
    }


  checkpass(){
 
    var x = (<HTMLInputElement>document.getElementById("pass3")).value;
    var y = (<HTMLInputElement>document.getElementById("pass4")).value;
    if(x != y)
    {
        return false;
    }else
    return true;
}

}
