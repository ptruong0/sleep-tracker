import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart: Date;
	private sleepEnd: Date;

	constructor(sleepStart: Date, sleepEnd: Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	
	public static fromJson(data: any): OvernightSleepData {
		return new this(
			new Date(data.sleepStart), new Date(data.sleepEnd)
		);
	}

	get duration(): number {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		return sleepEnd_ms - sleepStart_ms;
	}

	override summaryString(): string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000 * 60 * 60)) + " hr, " + Math.floor(difference_ms / (1000 * 60) % 60) + " min";
	}

	override dateString(): string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
	}
}
