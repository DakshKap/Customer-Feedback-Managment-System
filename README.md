# CFMS- Customer Feedback Management System

## Getting Started

### Mongo DB
* Express app connects to a remote database on mLab

### Angular App
* Angular app is served on port 4200
* For Angular app development:
```
cd client
npm install (if modules are not installed)
ng serve
```
* Navigate to `http://localhost:4200/` on your browser. The server will automatically reload if you change any of the source files.

* To build the Angular app:
```
cd client
npm install (if modules are not installed)
ng build 
```

* Angular builds are exported into public folder of the server app 
```
./server/public/angular
```

### Express App
* Express app listens on port 3000
* To run the application for development, follow Angular app build procedure first, then: 
```
cd server
npm install (if modules are not installed)
nodemon app.js
```
* To build the application for production, follow Angular app build procedure first, then: 
```
cd server
npm start
```