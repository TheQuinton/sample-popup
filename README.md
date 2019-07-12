# sample-popup
Sample Project - Vanilla.js - popup on marmot.com displaying cart contents

Designed to be pasted into the console of the browser on the homepage (marmot.com) after 2 items have been added to the cart.
Triggers when scrolling to the bottom 10% of the page.

Only JavaScript: the html/css are held within the script, no external dependencies.

### Obvious issues
Due to the cookies not storing the cart info (?) and lack of access to the backend services that store the user data, all of the data is pulled from the html and relies on the existing html structure for proper functionality.

Displaying cart data is pointless with no items in cart (no data).

### Project Parameters
At (Company) we often execute complex problems using entirely front-end JavaScript. For this challenge your solution should work if it is pasted directly into the JavaScript console of the browser after the page has fully loaded. Feel free to use jQuery. Also, our (Company) products must work across all browsers, but we will be testing your challenge in Chrome.

Go to www.marmot.com and add at least 2 products to your cart. Then return to the home page.

Write a JavaScript snippet that can be run in the console of the browser that does the following:

Extracts the number of items in the cart, the cart total, and the item images from the page. Store them in variables.

Create a trigger that activates when the user scrolls into the bottom 10% of the page.

The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons.
One button should close the overlay and the other should take the user to the cart page.
It should have a style consistent with the website. Design matters.

Behind the overlay add a semi­transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.

BONUS

Explain potential problems that could arise if this snippet had more or less than the 2 items in the cart. How would you address those problems?
