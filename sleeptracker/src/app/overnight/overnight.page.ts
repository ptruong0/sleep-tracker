import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { AlertController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-overnight',
  templateUrl: 'overnight.page.html',
  styleUrls: ['overnight.page.scss'],
})
export class OvernightPage {
	submitted: boolean = false;
	bedTime: string = '';
	wakeupTime: string = '';

	
  constructor(public sleepService:SleepService, private alertController: AlertController, private toastController: ToastController) { }

	ngOnInit() {
		console.log(this.allSleepData);
    // set default wakeup time to current time
		var d: Date = new Date();
		this.wakeupTime = d.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

		// set default bed time to 8 hours ago
		d.setHours(d.getHours() - 8);
		this.bedTime = d.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

		this.submitted = false;
	}

  // getters for only the time as string
  get bedTimeValue() {
    return new Date(this.bedTime).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
  }

  get wakeupTimeValue() {
    return new Date(this.wakeupTime).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
  }

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	get allOvernightDataReverse() {
    // sorted from most recent to least recent
		return SleepService.AllOvernightData.reverse();
	}

  // calculate average 
  get overnightAverage() {
    if (SleepService.AllOvernightData.length == 0) {
      return 0;
    }
    var avg_diff_ms: number = SleepService.overnightSum / SleepService.AllOvernightData.length;
    return Math.floor(avg_diff_ms / (1000 * 60 * 60)) + " hr, " + Math.floor(avg_diff_ms / (1000 * 60) % 60) + " min";

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Invalid time range of sleep',
      buttons: [
      {
        text: 'OK',
        cssClass: 'alert-btn',
      },],
      cssClass: 'alert'
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Submitted successfully!',
      duration: 1500,
      position: position,
      cssClass: 'success-toast'
    });

    await toast.present();
  }


  // add data to service on submit
	onSubmit() {
    var time1: Date = new Date(this.bedTime);
    var time2: Date = new Date(this.wakeupTime);

    // invalid sleep time if 0
    // render alert
    if (time2.getTime() - time1.getTime() == 0) {
      this.presentAlert();
      return;
    } 
    
    // if bedtime is later than wakeuptime, assume that the bedtime was on the previous day
    if (time2.getTime() - time1.getTime() < 0) {
      time1.setDate(time1.getDate() - 1);
    }

    // add data
		this.sleepService.logOvernightData(new OvernightSleepData(time1, time2));

		this.submitted = true;

    // render
    this.presentToast('bottom');
	}

}
