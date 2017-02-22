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
    $("#damageUpdate").hide();

	// these are the variables I believe I need

	var playerChamp;					// YOUR character - this will take the champAvailable function and set it as player - then has that value set to null so the it's not reselectable
	var playerHP;
	var playerCurrentHP

	var enemyChamp;						// once your character is chosen now it's the choosing opponent phase - this will take the champAvailable function, minus the var Player choice
	var enemyHP;
	var enemyCurrentHP;

	var champLocked = false;			// locking your champ in
	var enemyLocked = false;			// same as above, but for the opponent

	var gameState;						// create an object that stores information about the game state - this will be the state of continues, play again, game over, etc.

	var playerDamage = false;
	var enemyDamage = false;
	var combat = false;
	
	var name;							// champ name
	var hitPoints;						// champ HP
	var attPower;						// champ Attack power
	var armor;							// champ armor

	var victory;						// if you win 1 match
	var wins;							// if you win 5 matches
	var defeat;							// if you lose 1 match

	var attack = function(){};			// function attack button ---> the game asks that the attackPower increases every time you attack.
										// var attackPower
	var counterAtt = function(){};		// -- extra, random counter attack function -- //

	var play = function(){};			// function to start game


		// --- A function that contains the specific stats of the champ --- //

	var champStats = function (name, hitPoints, attPower, icon, hit) {
		this.name = name;
		this.hitPoints = hitPoints;
		this.attPower = attPower;
		this.icon = icon;
		//this.armor: armor;			// if time allows I'll add this variable
	}; // -- END ChampStats 



		// --- all playable champions available --- //

	var champions = [ 
		new champStats('Hera', 3300, 170, '<img src="assets/images/2078.png">' /*, 35 */),
		new champStats('Super Girl', 3300, 110, '<img src="assets/images/1678.png">', '<img src="assets/images/1678-hit.png">'), 
		new champStats('Aphrodite', 4000, 165, '<img src="assets/images/2534.png">'/*, 40 */), 
		new champStats('Sasha', 3500, 120, '<img src="assets/images/2372.png">'/*, 15 */), 
		new champStats('Artemis', 4200, 220, '<img src="assets/images/3274.png">'/*, 12 */), 
		new champStats('Hades', 3800, 155, '<img src="assets/images/1949.png">'/*, 28 */), 
		new champStats('Sephiroth', 3200, 200, '<img src="assets/images/2032.png">'/*, 6 */), 
		new champStats('Ares', 3650, 195, '<img src="assets/images/2081.png">'/*, 30 */), 
		new champStats('Athena', 3500, 215, '<img src="assets/images/3285.png">' /*, 6 */), 
		new champStats('Rei', 4200, 175, '<img src="assets/images/3393.png">' /*, 52 */), 
		new champStats('Asuka', 3600, 185, '<img src="assets/images/3396.png">' /*, 13 */), 
		new champStats('Zues', 5000, 95, '<img src="assets/images/851.png">' /*, 70 */)
	]; // -- END champions



		// --- Player Select Space --- //

	var champInfo = $('#champAvailable').each(function(){
		for (var i = 0; i < champions.length; i++)	{								// the forLoop is to get all the characters in the object array on the screen.
			var champAvailable = $('<button>');										// this variable is equal to a button that will soon be ported to the HTML page
			champAvailable.addClass('champ styling hoverAnimation');				// creating what the character buttons looks like
			champAvailable.attr('id', champions[i].name);							// adding the data for names
			champAvailable.attr('data-hp', champions[i].hitPoints);					// adding the data for hp 
			champAvailable.attr('data-attack', champions[i].attPower);				// adding the data for attack power 
			champAvailable.attr('data-icon', champions[i].icon);					// adding the data for picture 
			champAvailable.attr('data-hit', champions[i].hit);						// adding the data for hit animation 
			champAvailable.html(champions[i].icon);									// porting the image to the html
			$('#champAvailable').append(champAvailable);							// checking the html for the id 'champAvailable' and appending my champAvailable variable to it
		}; // --END for Loops
	}); // - END champInfo


		
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
			}; // -- END data .attr()

			playerChamp = data;

			champSelection.append($(this).clone(true).addClass('clone').removeClass('hoverAnimation').removeClass('champFader'));
			// I remove the id from the clone because I don't want it taking the effects of the original
			// 'this' is equal to the #champAvailable, which contains the stored data of my champions
			// .clone makes a new icon in the champion div
	 		// .addClass lets me adjust the clone to look different from the other champions icons
			// .removeClass removes the hover animation from the clone
			// without .clone() the image will delete its original position and move it to the champ selection space
			
			$('#playerChamp').html(champSelection);															// this ports the cloned image to the html
			
			console.log(playerChamp.name);
			
			$('#confirmChamp').fadeIn( 500 );																// fades in confirmChamp Button from champion onclick
			$('#arenaChamp').html(																			// this will take my #arenaChamp space and port the following data information 	
				`<p>${data.name}</p>
        		 <p>HP ${data.hp}</p>
        		 <p>attack ${data.attack}</p>`																						
    			); // -- END data collection

			// -- confirming your Champion --//

			$('#confirmChamp').on('click', function() {
				if(!champLocked) {
					champLocked = true;
					$('.champFader').fadeTo( "slow" , 0.5, function(){
						$(this).prop('onclick',null).off('click');
						// animation complete
					}); // -- END champFader animation
				} // -- END champLocked statemenet

				$('#chooseChamp').addClass('chooseEnemy');
				$('#chooseChamp').html('CHOOSE YOUR FOE');
				$(this).fadeOut( 400 );													// fades in confirmChamp Button from champion onclick
				console.log("You've Selected " + playerChamp.name);
			}); // End confirm champ

    	} // -- champLocked: If-statement

	}); // -- END onClick Champ Selection



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

			}; // -- END Enemy data .attr()
			
			enemyChamp = data;
			
			champSelection.append($(this).clone(true).addClass('clone').removeClass('hoverAnimation').removeClass('enemyFader'));				
			// 'this' is equal to the #champAvailable, which contains the stored data of my champions
			// .clone makes a new icon in the champion div
		 	// .addClass lets me adjust the clone to look different from the other champions icons
			// .removeClass removes the hover animation from the clone
			// without .clone() the image will delete its original position and move it to the champ selection space

			
			
			$('#enemyChamp').html(champSelection);															// this ports the cloned image to the html
			
			$('#confirmEnemy').fadeIn( 400 );																// fades in confirmChamp Button from champion onclick

			$('#arenaEnemy').html(																			// this will take my #arenaChamp space and port the following data information 	
				`<p>${data.name}</p>
        		 <p>HP ${data.hp}</p>
        		 <p>attack ${data.attack}</p>`																						
    			); // -- END data collection
			


    	// -- confirming your Enemy/Opponent  --//

			$('#confirmEnemy').on('click', function() {
				if (!enemyLocked) {
					enemyLocked = true;
					$('.enemyFader').remove();
					$(this).hide( );														// fades in confirmChamp Button from champion onclick
					$("#attBtn").fadeIn( 500 );
			
					console.log('Your Opponent is ' + enemyChamp.name);
				
					$('#chooseChamp').hide();

					combat = true;
					console.log( 'Prepare for Combat!' );
				} // -- END enemyLocked statement
			}); // End confirm Enemy
    	} //-- END champLocked if statement

	}); // -- END Opponent Select Space -- //


	// --- COMBAT --- //

 	$('#attBtn').on('click', function(){
 		$('#damageUpdate').show();
 		var timeoutID;

		// $(this).find('/image/1678-hit.png').toggle();

 		if ( !combat ) {
 			console.log('Please choose an opponent')
 		} else if ( combat === true ){
 			if (playerChamp.attack < enemyChamp.hp) {
 				if (enemyChamp.attack > playerChamp.hp) {
 					
 				}
					enemyChamp.hp -= playerChamp.attack;
					$('#damageUpdate').prepend("You hit for " + playerChamp.attack + "<p>" + "<hr>");

					playerChamp.hp -= enemyChamp.attack;

					$(arenaEnemy).html(
						`<p>${enemyChamp.name}</p>
        		 		 <p>HP ${enemyChamp.hp}</p>
        		 		 <p>attack ${enemyChamp.attack}</p>`																						
    				);
					
					$(arenaChamp).html(
						`<p>${playerChamp.name}</p>
        		 		 <p>HP ${playerChamp.hp}</p>
        		 		 <p>attack ${playerChamp.attack}</p>`																						
    				);

					console.log("Your HP: " + playerChamp.hp);
					playerChamp.attack += 25;
							$('#damageUpdate').show();
					$('#damageUpdate').prepend(enemyChamp.name + " Hit back for: " + enemyChamp.attack + "<p>" +  "<hr>");

			 } else if (playerChamp.attack === enemyChamp.hp || playerChamp.attack > enemyChamp.hp) {
					playerChamp.attack += 25;
					$('#damageUpdate').html('Victory! ');
					wins += 1;

					$('#damageUpdate').append("Wins: " + wins);
					combat = false;
					if (wins === 3) {
						console.log ("You Win!")
					} else { 
						enemyLocked = false;
						combat = false;
					}
			}
					// end attack combat
 		} // -- END Combat
	 }); // -- END onClick
	
	wins = 0;
}); // -- End Code




	// var currentPlayerHealth = player.health;
	// var currentEnemyHealth = enemy.health;
	
	// var combat = function(){			// the combat logic
	// 	combat = true;
	// };

		// Combat Pseudo Code: champ vs opponent
		
		// $('#attBtn').on('click', function(event) {
		// 	
		// 	} 
		// if (wins === 3) {
					// in the area display 'You Win!'
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








