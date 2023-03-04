import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private sleepService: SleepService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  switchTabs(route: string) {
    this.router.navigateByUrl('/' + route);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cleared data!',
      duration: 1500,
      position: position,
      cssClass: 'success-toast'
    });

    await toast.present();
  }

  clearData() {
    this.sleepService.clearData();
    this.presentToast('bottom');
  }

}
