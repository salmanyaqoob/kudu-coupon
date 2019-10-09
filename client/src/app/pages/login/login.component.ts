import { Component, OnInit , Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors} from '../../models/index';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['sy@in-hq.com', Validators.compose([ Validators.email, Validators.required])],
      'password': ['123456789', Validators.compose([ Validators.minLength(8), Validators.required])]
    });

  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      //if(data.length > 0 ){
      //  this.authType = data[data.length - 1].path;
      //} else {
      //
      //}

      this.authType = 'login';

      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page

    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    if(!this.authForm.valid){
      this.isSubmitting = false;
    } else {

      const credentials = this.authForm.value;
      this.userService
        .attemptAuth(this.authType, credentials)
        .subscribe(
          data => {
            console.log('login');
            this.authForm.reset();
            this.isSubmitting = false;
            this.router.navigate(['home']);

          },
          err => {
            console.log('login error');
            //console.log("login error:",err);
            if(err.error){
              this.errors = {errors: {["error - "]: err.error.message}};
            }
            this.isSubmitting = false;
          }
        );

    }


  }

}
