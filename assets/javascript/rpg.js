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


	// We need this to run the actual code in the DOM //
$(document).ready(function() {

	var champStats = function (name, hitPoints, attPower, icon) {
		this.name = name;
		this.hitPoints = hitPoints;
		this.attPower = attPower;
		this.icon = icon;
		//this.armor: armor
	};

		// all playable characters available
	var champions = [ 
		new champStats('Kali', 3300, 170, 'assets/images/2078.png' /*, 35 */),
		new champStats('Super Girl', 3280, 110 /*, 52 */), 
		new champStats('Kanna', 4000, 165 /*, 40 */), 
		new champStats('Sasha', 3500, 120 /*, 15 */), 
		new champStats('Ilmina', 4200, 220 /*, 12 */), 
		new champStats('Typhon', 3800, 155 /*, 28 */), 
		new champStats('Sephiroth', 3200, 200 /*, 6 */), 
		new champStats('Vishnu', 3650, 195 /*, 30 */), 
		new champStats('Psychopomp', 3500, 215 /*, 6 */), 
		new champStats('Rei', 4200, 175 /*, 52 */), 
		new champStats('Asuka', 3600, 185 /*, 13 */), 
		new champStats('Arch', 5000, 100 /*, 70 */), 
	]

	var name;							// your name
	var hitPoints;						// character HP
	var attPower;						// character Attack power
	var armor;							// character armor


	var player;							// YOUR character

	var enemy;							// maybe just a class change (characters either becomes player active, or enemy active)
	var stage;							// where the character goes after chosen --> stages can be: Your Character, Enemies Available, Enemy Fighting, Attack Button

	var chooseChamp = function(){};		// choose character onclick function from the options available
										// if statement

	var isPlayer = function(){};		// this will take the chooseChar function and set it as player
										// then null player from reselect
										// var player, stage
										// 
										// 5 hours

	var isEnemy = function(){};			// this will take the chooseChar function, minus the isPlayer choice
										// // var player, stage

	var attack = function(){};			// function attack button ---> the game asks that the attackPower increases every time you attack.
										// var attackPower
	var counterAtt = function(){};		// -- extra, random counter attack function -- //

	var play = function(){};			// function to start game


	for (var i = 0; i < champions.length; i++)	{
		console.log(champions[i]);

		var champBtn = $("<button>");			// this variable is equal to a button that will soon be ported to the HTML page

		champBtn.addClass("col-md-1 champ-button-color");

		champBtn.attr("data-champ", champions[i]);

		champBtn.html(champions[i]);

		$("#buttons").append(champBtn);
	}	// creating the character buttons


}); 									// getting a highlighted ) in my code, but I'm pretty sure it's suppose to be there



