import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    // Check if user is logged in
    if (this.loginService.isLoggedIn()) {
      // Redirect to /home
      this.router.navigate(['/home']);
    }
  }

}
