import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  timeOfDay: string = '';
	
  constructor(private router: Router) {
	}

	ngOnInit() {
    var curHr = new Date().getHours();
    
    // return time of day for greeting
    if (curHr < 12) {
      this.timeOfDay = "morning";
    } else if (curHr < 18) {
      this.timeOfDay = "afternoon";
    } else {
      this.timeOfDay = "evening";
    }
	}

  switchTabs(route: string) {
    this.router.navigateByUrl(route);
  }
}
