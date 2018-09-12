# Fast-Food-Fast

[![Build Status](https://travis-ci.com/fejiroofficial/stackoverflow-lite.svg?branch=develop)](https://travis-ci.com/fejiroofficial/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/fejiroofficial/Fast-Food-Fast/badge.svg?branch=build-version-one)](https://coveralls.io/github/fejiroofficial/Fast-Food-Fast?branch=build-version-one)
[![Maintainability](https://api.codeclimate.com/v1/badges/e54665da4af69a63abfd/maintainability)](https://codeclimate.com/github/fejiroofficial/Fast-Food-Fast/maintainability)

Fast-Food-Fast​ is a food delivery service app for a restaurant.

## Features

* [x] Users can create an account and log in
* [X] A user should be able to order for food
* [X] The admin should be able to add, edit or delete the fast-food items 
* [X] The admin should be able to see a list of fast-food items
* [X] The admin user should be able to do the following:
        a. See a list of orders
        b. Accept and decline orders
        c. Mark orders as completed
* [X] A user should be able to see a history of ordered food        

## Technologies Used

* [NodeJS](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)


## Installation

Install [`node`](https://nodejs.org/en/download/), version 8 or greater

Clone the repo:
```sh
git clone https://github.com/fejroofficial/fast-food-fast.git
```

Start server:
```sh
npm start
```


## API Routes

|   HTTP VERB   | ENDPOINT                    | FUCTIONALITY                          |
| ------------- | ----------------------------| --------------------------------------|
| GET           | api/v1/orders               | Fetch all orders                      |
| GET           | api/v1/orders/:id           | Fetch a specific order                |
| POST          | api/v1/orders               | Make a new order                      |
| PUT           | api/v1/orders/:id           | Update an order status                |


Api is hosted [`here`](https://food-fast-app.herokuapp.com/)


## UI Templates

UI is hosted [`here`](https://fejiroofficial.github.io/fast-food-fast)
