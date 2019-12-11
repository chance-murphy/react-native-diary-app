# Diary App

This application allows you to create a list of things to do and assign each item a label such as work, school, or personal. You can also edit the labels in the application to be more fitting for your list items. 

In order to run this app, you will need to create a firebase cloud firestore data base and copy the firebaseConfig information from the 
database your create and place it in the Main.js file at line 5, replacing what is currently there. Your firebaseConfig should look
something like the code below. 

``` 
const firebaseConfig = {
  apiKey: "AIzaSyBP68I0amDlh2dziWeHGwaqUYtM3FKwhts",
  authDomain: "hw-04-5d3fe.firebaseapp.com",
  databaseURL: "https://hw-04-5d3fe.firebaseio.com",
  projectId: "hw-04-5d3fe",
  storageBucket: "hw-04-5d3fe.appspot.com",
  messagingSenderId: "811603906260",
  appId: "1:811603906260:web:1cb14d2377375f6b897541"
};
``` 
