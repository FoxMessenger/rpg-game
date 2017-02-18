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


	// We need this syntax below to run the actual code in the DOM //
$(document).ready(function() {

		// A function that contains the specific stats of the champ
		// I'm hoping that I can grab just one part if need by
		// such as, console.log(champStats(name))
	var champStats = function (name, hitPoints, attPower, icon) {
		this.name = name;
		this.hitPoints = hitPoints;
		this.attPower = attPower;
		this.icon = icon;
		//this.armor: armor
	};

		// all playable characters available
	var champions = [ 
		new champStats('Kali', 3300, 170, '<img src="assets/images/2078.png">' /*, 35 */),
		new champStats('Super Girl', 3300, 110, '<img src="assets/images/1678.png">' /*, 52 */), 
		new champStats('Kanna', 4000, 165, '<img src="assets/images/2534.png">'/*, 40 */), 
		new champStats('Sasha', 3500, 120, '<img src="assets/images/2372.png">'/*, 15 */), 
		new champStats('Ilmina', 4200, 220, '<img src="assets/images/3274.png">'/*, 12 */), 
		new champStats('Typhon', 3800, 155, '<img src="assets/images/1949.png">'/*, 28 */), 
		new champStats('Sephiroth', 3200, 200, '<img src="assets/images/2032.png">'/*, 6 */), 
		new champStats('Vishnu', 3650, 195, '<img src="assets/images/2081.png">'/*, 30 */), 
		new champStats('Psychopomp', 3500, 215, '<img src="assets/images/3285.png">' /*, 6 */), 
		new champStats('Rei', 4200, 175, '<img src="assets/images/3393.png">' /*, 52 */), 
		new champStats('Asuka', 3600, 185, '<img src="assets/images/3396.png">' /*, 13 */), 
		new champStats('Arch', 5000, 95, '<img src="assets/images/851.png">' /*, 70 */), 
	]

		// these are the variables I believe I need
	var name;							// your name
	var hitPoints;						// character HP
	var attPower;						// character Attack power
	var armor;							// character armor


	var player;							// YOUR character

	var enemy;							// maybe just a class change (characters either becomes player active, or enemy active)
	var stage;							// where the character goes after chosen --> stages can be: Your Character, Enemies Available, Enemy Fighting, Attack Button

	// adding the character to the chosen character div
	$("#buttons").on("click", function() {
    	var champions = (this.innerHTML);
    	this.addClass("active");
    	this.onclick = null; // if the button is already clicked we don't want it setting off again

	});		// choose character onclick function from the options available
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

	// the forLoop is to get the characters on the screen.
	// I pulled it straight from the fridge example, so I migth have to remove some code.
	for (var i = 0; i < champions.length; i++)	{

		var champBtn = $("<button>");			// this variable is equal to a button that will soon be ported to the HTML page
		
		champBtn.addClass("champ-button champ generalBtn");
		champBtn.attr("src"	, champions[i.icon]);
		champBtn.html(champions[i].icon);

		$("#champBtn").append(champBtn);
	}	// creating the character buttons

		// adding the champ to your selected champ section
		$(".champ-button").on("click", function(){
			var champSelection = $("<div>");
			
			champSelection.addClass("champ");
			champSelection.html($(this).attr("src", champions[i.icon]).clone());	
			// champSelection.html($(this).attr("src", champions[i.name]).clone());	
			// without .clone() the image will delete it's position and move it to the Arena
			
			$("#active").html(champSelection);
			// console.log(championSelection);
	});

		// check if champSelected or enemySelected
    	var check = function() {
    		
    		for (var i = 0; i < word.length; i++) {
    			if (word[i] === guess) {
    				guesses[i].innerHTML = guess;

    				correctGuesses += 1;
    				console.log("are have guessed " + correctGuesses + " correctly.");
    			}
    		}
    		// check the charact index of the letter pressed
    		var checkChar = (word.indexOf(guess));
    		if (checkChar === -1) {
    			lives -= 1;
    			scoreboard();
    		}  else {
    			scoreboard();
    		}
    }



	console.log("You have chosen champion: ");

}); // getting a highlighted ) in my code, but I'm pretty sure it's suppose to be there



