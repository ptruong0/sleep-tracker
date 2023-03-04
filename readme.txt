--Readme document for Philip Truong, pctruong@uci.edu, 62272379--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

20/20
- 3/3 The ability to log overnight sleep
- 3/3 The ability to log sleepiness during the day
- 3/3 The ability to view these two categories of logged data
- 3/3 Either using a native device resource or backing up logged data
- 3/3 Following good principles of mobile design
- 3/3 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
15 hours 


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://www.freakyjolly.com/ionic-tabs-bar-navigation-tutorial/
https://capacitorjs.com/docs/apis/preferences
https://ionicframework.com/docs/api/grid


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
I worked on this assignment individually.


5. Is there anything special we need to know in order to run your code?
No


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
No, it is intended for anyone to use who wants to keep track of their sleep data.


7. Did you design your app specifically for iOS or Android, or both?
Both, Ionic should be compatible with both platforms, but the UI is more Android-like.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
The user is presented with buttons that display time picker components when clicked, and a submit button. This is the most intuitive way to receive
time inputs, and it is the conventional way on most apps.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
The user selects their sleepiness value using a slider from 1 to 7 (with icons and descriptions shown) and a submit button. A slider is the 
easiest way to record an input in the form of a numeric, much preferable to a dropdown or text input.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
The data is presented in a list format, with each datum represented as a list row containing the value and date.
This makes it easy for the user to scroll through their past data. The average is also displayed.


11. Which feature choose--using a native device resource, backing up logged data, or both?
Backing up logged data
The local storage can also be cleared on the settings page.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
It backs up to local storage using the Capacitor preferences plugin, storing the sleep service data as a stringifed JSON object.
 The app retrieves the data when it starts up, and saves to storage every time data is added.


14. How does your app implement or follow principles of good mobile design?
- Bottom navigation bar to navigate to different pages
- Custom color palette to match the sleep theme
- Toast component on data submission to confirm success
- Alert component (error prevention) for invalid input e.g. when sleep duration = 0
- Input components e.g. slider range, time picker
- Home page (initial view) gives introductory information and links to other pages

