# Reward Points App
**This is a React application that calculates and displays reward points earned by customers for their purchases. The app takes a list of transactions in JSON format and calculates rewards points earned by each customer based on the purchase amount.**

## Technologies Used
 - React
 - JavaScript
 - HTML
 - CSS

## How to Run the App

 - Clone the repository
 - Install dependencies using the command ``` npm install```
 - Run the app using the command  ``` npm start ```
 - Open [localhost](http://localhost:3000) to view it in the browser.

## How the App Works
 - The app consists of a single component called RewardPoints. It fetches the list of transactions from a JSON file using the fetch API and sets it in the component state using the useState hook.

 - The component uses two useEffect hooks to calculate rewards points for each customer and display them in a table. The first useEffect hook fetches the transaction data and sets it in the component state. The second useEffect hook calculates rewards points for each customer based on the purchase amount and updates the component state with the rewards data.
 
 - The rewards data is displayed in two tables. The first table shows the rewards points earned by each customer for each month. The second table shows the total rewards points earned by each customer.

## Calculation Method

Customers receive 2 reward points for every dollar spent over $100 in each transaction, plus 1 reward point for every dollar spent between $50 and $100 in each transaction. For example, a $120 purchase would earn 2x$20 + 1x$50 = 90 reward points.

## Unit Tests
The unit tests for this application can be found in the RewardPoints.test.js file. The tests cover the calculation of reward points for different transaction amounts, as well as the rendering of the tables.

## Future Improvements
Some potential improvements for this application include:

 * Adding the ability to sort the tables by customer name or reward points
 * Allowing users to upload their own transaction data instead of relying on a JSON file
 * Adding more robust error handling for failed API calls or invalid transaction data.

# Tags
React, JavaScript, HTML, CSS, rewards points, customer, purchases.






