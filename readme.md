# E-commerce Project Readme

>This is the readme file for the e-commerce project. This project is a web-based e-commerce application that allows users to browse products, add them to the cart, and proceed to checkout. The project utilizes HTML, CSS, and JavaScript to implement the functionality.

### Project Structure

_The project consists of the following files and folders:_

- `index.html`: The main HTML file that represents the home page of the e-commerce website.
- `cart.html`: The HTML file that represents the cart page where users can view and manage their cart items.
- js folder:
- `main.js`: The main JavaScript file that contains the core functionality of the e-commerce application.
- `store.json`: The JSON file that contains the product data used in the application.
- css folder:
- `main.css`: The main CSS file that contains the styles for the e-commerce application.
- img folder: Contains the images used in the project.
- assets folder: Contains additional assets such as fonts or icons used in the project.

### Project Features

_The e-commerce project includes the following features:_

- Product Listing: Users can browse through the available products, view their details, and add them to the cart.
- Currency Conversion: The application supports currency conversion between USD and UYU. Users can switch between these currencies to view the prices of products accordingly.
- Cart Management: Users can add products to the cart, view the cart contents, remove items from the cart, and proceed to checkout.
- Search Functionality: Users can search for specific products by brand or model.
- User Registration: Users can register their name and telephone number for checkout purposes.

### Project Functionality

_The core functionality of the e-commerce project is implemented in the main.js file. The key functions and their purposes are as follows:_

`fetchData()`: Fetches the product data from the store.json file and performs necessary operations such as setting products, enabling/disabling currency buttons, and converting currency.
`setProducts()` and `getProducts()`: Functions to store and retrieve product data from local storage.
`convertCurrency(currency)`: Handles currency conversion based on the selected currency code.
`addProductBag(e)`: Adds a product to the cart and updates the cart total.
`catProduct(category)`: Renders the products on the page based on the selected category.
`selectCategory()`: Handles category selection and filters the products accordingly.
`searchProducts()`: Handles product search based on user input.
`goToCart()`: Redirects the user to the cart page.
`renderBagProducts()`: Renders the cart items on the cart page.
`removeItem(e)`: Removes an item from the cart and updates the cart total.
`checkOut()`: Proceeds to checkout and clears the cart.
`setUserInfo(info)` and `getUserInfo()`: Functions to store and retrieve user registration information from session storage.
`valForm()`: Validates the user registration form and saves the user information.
`userChange()`: Updates the user information and UI based on user registration status.
`userLogOut()`: Handles user logout functionality.
`scrollBottom()`: Scrolls the page to the registration form when the "Register" button is clicked.

## Conclusion

__The e-commerce project provides a basic implementation of an online shopping experience. Users can browse products, add them to the cart, and proceed to checkout. The project can be further enhanced and customized to meet specific requirements and integrate with real-world e-commerce functionalities such as payment gateways, user authentication, and product inventory management. Feel free to explore and modify the code according to your needs.__