/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: AARIT 
* Student ID: 154931216 
* Date: 2 FEB 
*
* Online (Cyclic) Link: https://happy-puce-seagull.cyclic.app/
*
********************************************************************************/ 


var express = require('express');
var path = require('path');
var dataService = require('./data-service.js');
const fs = require('fs');

var app = express();

app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

var onHttpStart = function(){
    console.log("Express http server listening on", HTTP_PORT);
}

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/about.html'))
});

app.get('/students', (req, res) => {
	dataService.getAllStudents()
		.then((studentsArr) => {
		    res.send(studentsArr);
		}).catch((err)=>{
			res.json({ message: err });
			});
});

app.get('/intlstudents', (req, res) => {
	dataService.getInternationalStudents().then((studentsArr) => {
		var student = studentsArr.map(function(elem, index){
			if(elem.isInternationalStudent == true){
				return elem;
			}
		});	
    res.send(student);
  }).catch((err)=>{	
	res.json({ message: err });	
	});
});

app.get('/programs', (req, res)=>{
		dataService.getPrograms().then((ProgramArr) => {
		res.send(ProgramArr);
	}).catch((err)=>{	
		res.json({ message: err });	
	})
});

app.use((req,res)=>{
	res.status(404).send('Page Not Found');
})

dataService.initialize().then(() => {
		app.listen(HTTP_PORT, () => {
		console.log(`Server running on port: ${HTTP_PORT}`);
		});
	}).catch((err) => {
		console.log(err);
	});
