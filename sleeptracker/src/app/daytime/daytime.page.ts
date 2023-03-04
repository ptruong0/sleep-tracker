import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-daytime',
  templateUrl: './daytime.page.html',
  styleUrls: ['./daytime.page.scss'],
})
export class DaytimePage implements OnInit {

  sliderValue: number;
	sliderDescription: string | undefined;

  constructor(public sleepService:SleepService, private toastController: ToastController) {
    this.sliderValue = 1;	// default value
  }

  ngOnInit() {
		this.sliderDescription = StanfordSleepinessData.ScaleValues[this.sliderValue];
  }


  // get data in order of most recent to least recent
  get allSleepinessDataReverse() {
		return SleepService.AllSleepinessData.reverse();
	}

  // calculate average
  get sleepinessAverage() {
    if (SleepService.AllSleepinessData.length == 0) {
      return 0;
    }
    return (SleepService.sleepinessSum / SleepService.AllSleepinessData.length).toFixed(2);
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

  onSliderChange() {
		console.log(this.sliderValue);
		this.sliderDescription = StanfordSleepinessData.ScaleValues[this.sliderValue];
	}

  // add data to service
  onSubmit() {
    this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sliderValue));
    this.presentToast('bottom');
  }
}
