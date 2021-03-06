// ** 					NOTES					** //

	//	.animate 			can be used to resize, move, or change opacity among aother things 				// example: $('element'/'.class'/'#id').animate({opacity: '0.05'})
	
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

	// these are the variables I believe I need

	var playerChamp;					// YOUR character - this will take the champAvailable function and set it as player - then has that value set to null so the it's not reselectable
	var enemyChamp;						// once your character is chosen now it's the choosing opponent phase - this will take the champAvailable function, minus the var Player choice
	var enemyHP;
	var enemyCurrentHP;
	var champLocked = false;			// locking your champ in
	var enemyLocked = false;			// same as above, but for the opponent
	var combat = false;
	var name;							// champ name
	var hitPoints;						// champ HP
	var attPower;						// champ Attack power
	var armor;							// champ armor
	var victory;						// if you win 1 match
	var wins;							// if you win 5 matches
	var defeat;							// if you lose 1 match
	
	
	
	function playSound(){
		var punch = [
		new Audio('assets/audio/punch1.mp3'),
		new Audio('assets/audio/slap1.mp3'),
		new Audio('assets/audio/punch2.mp3')
	]

		var random = punch[Math.floor(Math.random() * punch.length)];
		random.play();

	}

	function crit(){

		var critHit = Math.ceil(Math.random() * 6);
		console.log('crit roll is: ' + critHit)
		$('#damageUpdate').removeClass('healed');
		$('#damageUpdate').removeClass('crit');
		if (critHit === 5) {

			console.log('crit!');
			playerChamp.attack *= 50;
			playerChamp.attack /= 50;
			setTimeout(function(){
		
				$('#damageUpdate').html('+50 CRIT HIT!!!');
		
			}, 500);
			clearTimeout(critHit)
			
		} else if (critHit === 3) {
			console.log('healed!');
			playerChamp.hp += 30;
			setTimeout(function(){
		
				$('#damageUpdate').html('HEALED +30!');		
		
			}, 500);
			clearTimeout(critHit)
		}
		

}
	// --- A function that contains the specific stats of the champ --- //


	var champStats = function (name, hitPoints, attPower, icon, hit) {
		this.name = name;
		this.hitPoints = hitPoints;
		this.attPower = attPower;
		this.icon = icon;
		this.hit = hit;
		//this.armor: armor;			// if time allows I'll add this variable
	}; // -- END ChampStats 



	// --- all playable champions available --- //

	var champions = [ 
		new champStats('Hera', 1200, 300, '<img src="assets/images/2078.png">', '<img src="assets/images/2078-hit.png">'),
		new champStats('SuperGirl', 2400, 190, '<img src="assets/images/1678.png">', '<img src="assets/images/1678-hit.png">'), 
		new champStats('Aphrodite', 2000, 165, '<img src="assets/images/2534.png">', '<img src="assets/images/2534-hit.png">'/*, 40 */), 
		new champStats('Sasha', 1500, 220, '<img src="assets/images/2372.png">', '<img src="assets/images/2372-hit.png">'/*, 15 */), 
		// new champStats('Artemis', 2200, 180, '<img src="assets/images/3274.png">', '<img src="assets/images/3274-hit.png">'/*, 12 */), 
		new champStats('Hades', 1800, 255, '<img src="assets/images/1949.png">', '<img src="assets/images/1949-hit.png">'), 
		new champStats('Sephiroth', 1100, 350, '<img src="assets/images/2032.png">', '<img src="assets/images/2032-hit.png">'), 
		new champStats('Ares', 1650, 295, '<img src="assets/images/2081.png">', '<img src="assets/images/2081-hit.png">'/*, 30 */), 
		// new champStats('Athena', 3500, 215, '<img src="assets/images/3285.png">', '<img src="assets/images/3285-hit.png">' /*, 6 */), 
		new champStats('Rei', 2200, 145, '<img src="assets/images/3393.png">', '<img src="assets/images/3393-hit.png">'), 
		new champStats('Asuka', 1600, 325, '<img src="assets/images/3396.png">', '<img src="assets/images/3396-hit.png">'), 
		// new champStats('Zues', 5000, 95, '<img src="assets/images/851.png">' /*, 70 */)
	]; // -- END champions



	// --- Player Select Space --- //
var gameStart = function() {
	$("#confirmChamp").hide();
    $("#confirmEnemy").hide();
    $("#attBtn").hide();
    $("#damageUpdate").hide();
    $("arenaChamp").hide();
    $("arenaEnemy").hide();

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
			
		if (!champLocked) {
			champSelection = $('<div>');											// deciding that I will make the section a new Div
			$('.champFader').not(this).removeClass('champFader');
			$(this).addClass('champFader');											// adding an ID can only be added to 1 element, so the last element you picked will have this ID and no other
			champInfo = $(this);													// champInfo is now equal to this (which is champAvailable I believe). ChampInfo now can have object attributes of .name .hp and .attack, because I named them earlier with data-hp, data-name, etc. 
   			var data = {
       			name: champInfo.attr('id'),
        		hp: champInfo.data('hp'),
        		attack: champInfo.data('attack'),
        		icon: champInfo.data('icon'),
        		hit: champInfo.data('hit')
			}; // -- END data .attr()

			playerChamp = data;

			champSelection.append($(this).clone(true).addClass('clone').removeClass('hoverAnimation').removeClass('champFader').prop('onclick',null).off('click'));
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
			`	<p>${data.name}</p>
        		<p>HP ${data.hp}</p>
        		<p>attack ${data.attack}</p>	`																						
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
				$('#chooseChamp').html('CHOOSE AN ENEMY');
				$(this).fadeOut( 400 );													// fades in confirmChamp Button from champion onclick
				console.log("You've Selected " + playerChamp.name);
			}); // End confirm champ

    	} // -- champLocked: If-statement

	}); // -- END onClick Champ Selection



	// -- Opponent Select Space -- //

	$('.champ').on('click', function(event){										// adding the champ to the selected champ section (this section is different from the space with all the champs)
		if (champLocked === true && enemyLocked === false) {
			
			champSelection = $('<div>');										// deciding that I will make the section a new Div
			$('.enemyFader').not(this).removeClass('enemyFader');
			$(this).addClass('enemyFader');												// adding an ID can only be added to 1 element, so the last element you picked will have this ID and no other
			champInfo = $(this);												// champInfo is now equal to this (which is champAvailable I believe). ChampInfo now can have object attributes of .name .hp and .attack, because I named them earlier with data-hp, data-name, etc. 
   			var data = {
       			name: champInfo.attr('id'),
        		hp: champInfo.data('hp'),
        		icon: champInfo.data('icon'),
        		attack: champInfo.data('attack'),
        		hit: champInfo.data('hit')

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
			`	<p>${data.name}</p>
        		<p>HP ${data.hp}</p>
        		<p>attack ${data.attack}</p>	`
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

 	$('#attBtn').on('click', function(event){
		var animation = function (){
		$('#playerChamp').find('.champ').html(playerChamp.hit).removeClass('characterShake');
		setTimeout(function(){

			$('#playerChamp').find('.champ').addClass('characterShake').html(playerChamp.icon);
			playSound();
		
		}, 300); 
		
		
		$('#enemyChamp').find('.champ').html(enemyChamp.hit).removeClass('characterShake');
		setTimeout(function(){
		
			$('#enemyChamp').find('.champ').addClass('characterShake').html(enemyChamp.icon);
			if (playerChamp.attack === enemyChamp.hp || playerChamp.attack > enemyChamp.hp) {
		
		} else {
				playSound();
				
			}
		}, 600);
	}

		
		$('#damageUpdate').show();
		animation();

 		///// COMBAT STARTS HERE //////
 		
 		if ( !combat && playerChamp.hp > 0 ) { // if combat is false, have them choose another champ
 			$('#damageUpdate').html('Choose another opponent!');
 		
 		} else if ( combat === true && playerChamp.hp <= 0) {
 					
 					$("#attBtn").hide();
 					playerChamp.hp = 0;

 					$(arenaChamp).html(
					`	<p>${playerChamp.name}</p>
        		 		<p>HP ${playerChamp.hp}</p>
        		 		<p>attack ${playerChamp.attack}</p>	`
					)
 					$('#damageUpdate').html('<h1>' + "You Died...");
				

 		} else if ( combat === true ){
 			
 			if (playerChamp.attack < enemyChamp.hp && playerChamp.hp > enemyChamp.attack) {
					
					enemyChamp.hp -= playerChamp.attack;
					$('#damageUpdate').html("You hit for " + playerChamp.attack + "<p>" + "<hr>");
					playerChamp.hp -= enemyChamp.attack;

					$(arenaEnemy).html(
					`	<p>${enemyChamp.name}</p>
        		 		<p>HP ${enemyChamp.hp}</p>
        		 		<p>attack ${enemyChamp.attack}</p>	`
    				); // --- END Arena ENEMY Update
					
					$(arenaChamp).html(
					`	<p>${playerChamp.name}</p>
        		 		<p>HP ${playerChamp.hp}</p>
        		 		<p>attack ${playerChamp.attack}</p>	`																						
    				); // --- END Arena PLAYER update

					playerChamp.attack += 50;
					console.log(playerChamp.name + ' hit for: ' + playerChamp.attack);
					crit();
					$('#damageUpdate').show();
					$('#damageUpdate').html(playerChamp.name + " You hit for  " + "<h1>" + playerChamp.attack + "<p>" +  "<hr>");
					setTimeout(function(){
						$('#damageUpdate').html(enemyChamp.name + " Hit back for " + "<h1>" + enemyChamp.attack + "<p>" +  "<hr>");
					}, 300)
					

			} //--- END Champ.attack < Enemy.hp
			  else if (enemyChamp.attack > playerChamp.hp || enemyChamp.attack === playerChamp.hp) {
	
 					$("#attBtn").hide();
 					playerChamp.hp = 0;

 					$(arenaChamp).html(
					`	<p>${playerChamp.name}</p>
        		 		<p>HP ${playerChamp.hp}</p>
        		 		<p>attack ${playerChamp.attack}</p>	`
        		 	)
 					$('#damageUpdate').html('<h1>' + "You Died...");
 					$('#reset').html('Try Again');
					
					combat = false;
					

			} //--- END enemyChamp.attack > playerChamp.hp
			  else if (playerChamp.attack === enemyChamp.hp || playerChamp.attack > enemyChamp.hp) {
					
					$('#enemyChamp').find('.champ').addClass('enemyDead');

					enemyChamp.hp = 0;
					$('#arenaEnemy').html(
					`	<p>${enemyChamp.name}</p>
        		 		<p>HP ${enemyChamp.hp}</p>
        		 		<p>attack ${enemyChamp.attack}</p>	`
    				); // --- END Arena PLAYER update

					playerChamp.attack += 105;
					$('#damageUpdate').html( 'Victory! '	);
					wins += 1;
					console.log('Wins: ' + wins)

					$("#attBtn").hide();

					$('#damageUpdate').append('Wins: ' + wins + '.' + ' Choose a new Opponent');
					$('#enemyChamp').find('.enemyDead').prop('onclick',null).off('click');
					combat = false;

					if (wins === 3) {
						$('#damageUpdate').html('<h1>' + 'You Win!'	);
					} //--- END WIN statement
					  
					  else { //restart enemy selection and combat
						enemyLocked = false;
						combat = false;
					} // --- END else, restart combat
			
			} // end attack combat
 		
 		} // -- END COMBAT

	 }); // -- END onClick
	
};

	$('#reset').on('click', function(){
			$("#attBtn").unbind("click");
			console.log('reset');
			$( '#enemyChamp' ).empty();
			$( '#playerChamp' ).empty();
			$( '#confirmChamp' ).hide();
			$( '#confirmEnemy' ).hide();
			$( '#arenaChamp' ).empty();
			$( '#arenaEnemy' ).empty();
			$( '#champAvailable' ).empty();
			// $( '#attBtn' ).empty();
			combat = false;
			champLocked = false;
			enemyLocked = false;
			$('#champAvailable').each(function(){})
			// playerChamp.attack = data;
			wins = 0;
			gameStart();
			
	}) ;

	gameStart();
	wins = 0;

}); // -- End Code





