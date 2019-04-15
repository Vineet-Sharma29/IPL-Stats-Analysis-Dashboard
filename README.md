# IPL

This project analyses IPL data from 2008 to 2016, and gives graphical display of the data. It uses following frameworks and  libraries :- 

* VueJS - to make frontend
* NodeJS - to make backend
* Vuetify - UI plugin used with VueJS
* Vue-Chartjs - used to plot charts
* Axios - to make requests over http
* Vue-router - vue add-on used for routing various views
* Vuex - used to manage state of the app
* PostgreSQL - to handle database

## Repo Structure

### master branch
* Contains code for production
* Data folder contains files used to get the data
* ```db.sql``` is dump file of the database which can be used to migrate the database in a new local system

### dev branch
* Client folder contains code for frontend in VueJs <br />
* Server folder contains code for backend in NodeJS


## How to run code?

### Master Branch

* cd into root( which contains package.json file ) directory and run ```npm i```, followed by ```npm start```

### Dev Branch

* cd into client directory and run ```npm i```, followed by ```npm run serve```
* cd into server directory and run ```npm i```, followed by ```npm start```
