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
	
	// First I want to hide these buttons, until I call them
	$("#confirmChamp").hide();
    $("#confirmEnemy").hide();
    $("#attBtn").hide();

	// these are the variables I believe I need

	var player;							// YOUR character - this will take the champAvailable function and set it as player - then has that value set to null so the it's not reselectable
	
	var enemy;							// once your character is chosen now it's the choosing opponent phase - this will take the champAvailable function, minus the var Player choice
		
	var gameState;						// create an object that stores information about the game state - this will be the state of continues, play again, game over, etc.

	var battle = false;
	var playerDamage = false;
	var enemyDamage = false;

		// Confirm Champ Pseudo Code: selecting the player and the opponent
		// (var playerState = false) as default
	var name;							// champ name
	var hitPoints;						// champ HP
	var attPower;						// champ Attack power
	var armor;							// champ armor

	var victory;						// if you win 1 match
	var win;							// if you win 5 matches
	var defeat;							// if you lose 1 match

	var attack = function(){};			// function attack button ---> the game asks that the attackPower increases every time you attack.
										// var attackPower
	var counterAtt = function(){};		// -- extra, random counter attack function -- //

	var play = function(){};			// function to start game


		// A function that contains the specific stats of the champ
	var champStats = function (name, hitPoints, attPower, icon /*, armor */) {
		this.name = name;
		this.hitPoints = hitPoints;
		this.attPower = attPower;
		this.icon = icon;
		//this.armor: armor;			// if time allows I'll add this variable
	};

		// all playable champions available
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
		new champStats('Archer', 5000, 95, '<img src="assets/images/851.png">' /*, 70 */)
	];



	var enemyLocked = false;				// same as above, but for the opponent
	var champLocked = false;				// locking your champ in

		// --- Player Select Space --- //

	var champInfo = $('#champAvailable').each(function(){
		for (var i = 0; i < champions.length; i++)	{								// the forLoop is to get all the characters in the object array on the screen.
			var champAvailable = $('<button>');										// this variable is equal to a button that will soon be ported to the HTML page
			champAvailable.addClass('champ styling hoverAnimation');				// creating what the character buttons looks like
			champAvailable.attr('id', champions[i].name);							// adding the data for names
			champAvailable.attr('data-hp', champions[i].hitPoints);					// adding the data for hp 
			champAvailable.attr('data-attack', champions[i].attPower);				// adding the data for attack power 
			champAvailable.attr('data-icon', champions[i].icon);					// adding the data for picture 
			champAvailable.html(champions[i].icon);									// porting the image to the html
			$('#champAvailable').append(champAvailable);							// checking the html for the id 'champAvailable' and appending my champAvailable variable to it
			
		};	

	}); // - END Player Select Space- //

		// -- Champ Select Space -- //

	$('.champ').on('click', function(event){										// adding the champ to the selected champ section (this section is different from the space with all the champs)
		
		if (champLocked === false) {
			var champSelection = $('<div>');										// deciding that I will make the section a new Div
			$('.champFader').not(this).removeClass('champFader');
			$(this).addClass('champFader');											// adding an ID can only be added to 1 element, so the last element you picked will have this ID and no other
			var champInfo = $(this);												// champInfo is now equal to this (which is champAvailable I believe). ChampInfo now can have object attributes of .name .hp and .attack, because I named them earlier with data-hp, data-name, etc. 
   			var data = {
       			name: champInfo.attr('id'),
        		hp: champInfo.data('hp'),
        		attack: champInfo.data('attack')	
		};



	champSelection.append($(this).clone().addClass('clone').removeClass('hoverAnimation').removeClass('champFader'));
		// I remove the id from the clone because I don't want it taking the effects of the original
		// 'this' is equal to the #champAvailable, which contains the stored data of my champions
		// .clone makes a new icon in the champion div
	 	// .addClass lets me adjust the clone to look different from the other champions icons
		// .removeClass removes the hover animation from the clone
		// without .clone() the image will delete its original position and move it to the champ selection space
	
		$('#playerChamp').html(champSelection);															// this ports the cloned image to the html

		$('#confirmChamp').fadeIn( 500 );																// fades in confirmChamp Button from champion onclick

		$('#arenaChamp').html(																			// this will take my #arenaChamp space and port the following data information 	
			`<p>${data.name}</p>
        	 <p>HP ${data.hp}</p>
        	 <p>attack ${data.attack}</p>`																						
    	);
    	}
	}); // -- END Champs Select Space -- //



		// -- Opponent Select Space -- //

	$('.champ').on('click', function(event){										// adding the champ to the selected champ section (this section is different from the space with all the champs)
		if (champLocked === true && enemyLocked === false) {
			
			var champSelection = $('<div>');										// deciding that I will make the section a new Div
			$('.enemyFader').not(this).removeClass('enemyFader');
			$(this).addClass('enemyFader');												// adding an ID can only be added to 1 element, so the last element you picked will have this ID and no other
			var champInfo = $(this);												// champInfo is now equal to this (which is champAvailable I believe). ChampInfo now can have object attributes of .name .hp and .attack, because I named them earlier with data-hp, data-name, etc. 
   			var data = {
       			name: champInfo.attr('id'),
        		hp: champInfo.data('hp'),
        		attack: champInfo.data('attack')	
			};

	champSelection.append($(this).clone().addClass('clone').removeClass('hoverAnimation').removeClass('enemyFader'));				
		// 'this' is equal to the #champAvailable, which contains the stored data of my champions
		// .clone makes a new icon in the champion div
	 	// .addClass lets me adjust the clone to look different from the other champions icons
		// .removeClass removes the hover animation from the clone
		// without .clone() the image will delete its original position and move it to the champ selection space

		$('#OppChamp').html(champSelection);															// this ports the cloned image to the html
		$('#confirmEnemy').fadeIn( 400 );																// fades in confirmChamp Button from champion onclick

		$('#arenaEnemy').html(																			// this will take my #arenaChamp space and port the following data information 	
			`<p>${data.name}</p>
        	 <p>HP ${data.hp}</p>
        	 <p>attack ${data.attack}</p>`																						
    	);
    	}
	}); // -- END Opponent Select Space -- //


	// -- confirming your Champion --//
	$('#confirmChamp').on('click', function() {
		if(!champLocked) {
			champLocked = true;
			$('.champFader').fadeTo( "slow" , 0.5, function(){
				$(this).prop('onclick',null).off('click');
				//animation complete
			});
		}

			$('#chooseChamp').addClass('chooseEnemy');
			$('#chooseChamp').html('Choose your Opponent');
			$(this).fadeOut( 400 );													// fades in confirmChamp Button from champion onclick
			console.log("You've Selected a champ!");
	}); // End confirm champ


	// -- confirming your Enemy  --//
	$('#confirmEnemy').on('click', function() {
		if (!enemyLocked) {
			enemyLocked = true;
			$('.enemyFader').remove();
			$(this).hide( );														// fades in confirmChamp Button from champion onclick
			$("#attBtn").fadeIn( 500 );
			console.log("You've Selected an Opponent!");
		} 
	}); // End confirm Enemy






// var playerCheck = function(){};
	
	// var playerCheck = function(){
	// 	if (enemyLocked === true) {	
	// 		var champInfo = $('#champAvailable').each(function(){
	// 			for (var i = 0; i < champions.length; i++)	{								// the forLoop is to get all the characters in the object array on the screen.
	// 				var champAvailable = $('<button>');										// this variable is equal to a button that will soon be ported to the HTML page
	// 				champAvailable.addClass("champ styling hoverAnimation");				// creating what the character buttons looks like
	// 				champAvailable.attr("id", champions[i].name);							// adding the data for names
	// 				champAvailable.attr("data-hp", champions[i].hitPoints);					// adding the data for hp 
	// 				champAvailable.attr("data-attack", champions[i].attPower);				// adding the data for attack power 
	// 				champAvailable.html(champions[i].icon);									// porting the image to the html
	// 				$("#champAvailable").append(champAvailable);							// checking the html for the id "champBtn" and connecting my champBtn variable to it
	// 																						// .append() will attach each character in my array sequentially.
	// 			};
	// 		});
	// 	}	
	// }
																
	




	
		// When the "confirm-selection Champion button" is clicked:
		// var champState = true

		
		// when champState is true:
		// champions[i] in the champion select section becomes onclick: Null
		// end player selection part. 

        // Champion selection then moves to: Opponent selection
        // (var enemyState = false) as default
		// when "confirm-selection Opponent button" is clicked:
		// (var enemy = champions[i]) and (var enemyState = true) 
        // champions[i] in the champion select section becomes onclick: Null
        // end Opponent selection part


		// $("#activeChamp").on("click", function(){
		// 	var player = $("#confirmChamp");
		// 	if (player === "#confirmChamp") {
		// 	};
			
		// });								// the "Select Champion" button will add a "statusClass" to champion state. It will listen to the event listener on("click") we'll call it: player	

		// when you lock in a character (click button)
		// set champLocked to true;

		// inside the onclick for the character select button
		// check if champLock do nothing
		// else select your character

	// var checkChampState = function(){
	// 	if (champState === true) {
	// 	}
	// }


	
	// var currentPlayerHealth = player.health;
	// var currentEnemyHealth = enemy.health;
	
	// var combat = function(){			// the combat logic
	// 	battle = true;
	// };

		// Combat Pseudo Code: champ vs opponent
		
		// $("#attBtn").on("click", function(event) {
		// 	if (player.attPower < enemy.hitPoints) {
		// 			enemy.hitPoints -= player.attPower;
					// store current hp
		// 			// run function (attPower + 20)
		// 	}  if else (player.attPower === enemy.hitPoints || player.attPower > enemy.hitPoints) {
		// 			// run function (attPower + 20)
		// 			// in the arena display "Victory!"
					// var wins += 1;
		// 			// end attack combat
		// 	} 
		// if (wins === 3) {
					// in the area display "You Win!"
		//  }

		// 	// run function enemy attack phase

		// 	if (enemy.attPower < player.hitPoints) {
		// 			enemy.hitPoints -= player.attPower;
		// 			// end attack combat
		// 	}  if else (enemy.attPower === player.hitPoints || enemy.attPower > player.hitPoints) {
		// 			// end combat
					// in the arena display "Defeat"
		//			// in the area display "Continue?"
					// if (continue === true) {
					// 	continue -= 1;
					// } else {
					// 	end game
					// }
					// display "Play Again" in arena
		// 	} 		
		// };




});



