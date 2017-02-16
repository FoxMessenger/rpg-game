// ** 					NOTES					** //

	// key: element means: p, div, img, etc.
	//	.animate 			can be used to resize, move, or change opacity among aother things 				// example: $("element"/".class"/"#id").animate({opacity: "0.05"})
	//	.addClass			adds a addClass													 				// example: $("element"/".class"/"#id").addClass("class-name")
	//	.removeClass		removes a class
	//	.on("click")		you can click a button
	//	.attr 				adds an attribute

	// $(document).ready(function(){})

	//	TEST AFTER EACH POINT TO SEE IF IT IS ALL WORKING
	//	check HTML
	//	setup environment: empty divs, script<javascript>
	//	add style
	//	start setting up the listener 
	//	add a counter (something that adds)
	//	enter a target number/final number
	//	go into the logic and icrementally check the progress	

// ** 					NOTES					** //



var player;							// chosen character
var name;							// name of your character
var hitPoints;						// your HP
var attackPower;					// your Attack power

var enemies;						// all other players become enemies available to attack

var stage;							// where the character goes after chosen --> stages can be: Your Character, Enemies Available, Enemy Fighting, Attack Button

var choosePlayer = function(){};	// choose character onclick function from the options available
var chooseEnemy = function(){};		// choose Opponent character onclick function from the left over options available

var attack = function(){};			// function attack button ---> the game asks that the attackPower increases every time you attack.
var counterAtt = function(){};		// -- extra, random counter attack function -- //

var play = function(){};			// function to start game




