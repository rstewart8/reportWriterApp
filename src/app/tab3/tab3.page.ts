import { AuthenticationService } from './../_services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthenticationService, private router: Router) {}
 
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
