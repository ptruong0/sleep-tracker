import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';

@Injectable({
	providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData: boolean = true;
	public static AllSleepData: SleepData[] = [];
	public static AllOvernightData: OvernightSleepData[] = [];
	public static AllSleepinessData: StanfordSleepinessData[] = [];

	public static overnightSum: number = 0;
	public static sleepinessSum: number = 0;

	constructor() {
		this.loadData()
			.then(() => {
				if (SleepService.AllSleepData.length == 0 && SleepService.LoadDefaultData) {
					this.addDefaultData();
					SleepService.LoadDefaultData = false;
				}
			})
	}

	private async loadData() {
		await Preferences.get({ key: 'overnightData' })
			.then((data) => {
				JSON.parse(data.value || '[]').forEach((item: {}) => {
					this.logOvernightData(OvernightSleepData.fromJson(item))
				});
			});

		await Preferences.get({ key: 'sleepinessData' })
			.then((data) => {
				JSON.parse(data.value || '[]').forEach((item: {}) => {
					this.logSleepinessData(StanfordSleepinessData.fromJson(item));
				});
			});
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	public logOvernightData(sleepData: OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		SleepService.overnightSum += sleepData.duration;
		this.saveOvernightData();
	}

	public logSleepinessData(sleepData: StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		SleepService.sleepinessSum += sleepData.value;
		this.saveSleepinessData();
	}

	private saveOvernightData() {
		Preferences.set({ key: 'overnightData', value: JSON.stringify(SleepService.AllOvernightData) });
	}

	private saveSleepinessData() {
		Preferences.set({ key: 'sleepinessData', value: JSON.stringify(SleepService.AllSleepinessData) });
	}

	// resets current data and also clears local storage
	public clearData() {
		SleepService.AllSleepData = [];
		SleepService.AllOvernightData = [];
		SleepService.AllSleepinessData = [];
		SleepService.overnightSum = 0;
		SleepService.sleepinessSum = 0;

		// clear storage
		Preferences.set({ key: 'overnightData', value: JSON.stringify([]) });
		Preferences.set({ key: 'sleepinessData', value: JSON.stringify([]) });
	}
}
