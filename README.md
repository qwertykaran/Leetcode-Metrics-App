# Leetcode-Metrics-App
The Leetcode Matrics App is a web application that allows users to view the profile data of a Leetcode problem solver. Built with HTML, CSS, and JavaScript, the app fetches and displays the number of easy, medium, and hard problems solved by the user, making it easy for anyone to analyze their Leetcode progress.

This repository is made public for anyone who is interested in exploring the code, using the app, or contributing to its development.

Features:
Profile Data Display: Fetches the Leetcode user profile and shows the number of easy, medium, and hard problems solved.
Progress Circles: Displays progress as circular indicators for each difficulty level (easy, medium, and hard).
Responsive Design: The interface adapts well across different screen sizes, providing a seamless experience on both desktop and mobile devices.
Technologies Used:
HTML: Provides the structure of the web application, ensuring content is displayed in a clean, readable format.
CSS: Styles the web pages, making the app visually appealing with a user-friendly design and responsive layout.
JavaScript: Powers the functionality of the app, including validating user input, interacting with the Leetcode API, and updating the UI dynamically. 

 
How It Works:
The app uses the Leetcode GraphQL API to fetch data related to a user's solved problems and submissions.
It fetches statistics like the number of easy, medium, and hard problems solved and displays them using progress circles.
Users can enter a Leetcode username, and the app fetches relevant statistics and displays them in real-time.
API Used:
The app interacts with the Leetcode GraphQL API to retrieve user profile data, including:

Total problems solved by difficulty (easy, medium, hard).
Submission statistics for easy, medium, and hard problems.
The app handles CORS issues using a proxy server (https://cors-anywhere.herokuapp.com/).
How to Use:
Clone or download this repository.
Open the index.html file in your browser.
Enter any Leetcode username in the input field.
View the profile statistics for the number of easy, medium, and hard problems solved by the user.
