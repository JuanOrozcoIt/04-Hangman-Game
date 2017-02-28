var guesses = 0;
var wrong_guesses = [];
var good_guesses = [];
var listen = true;
var total_score = 0;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var words = ["cristiano ronaldo", "lionel messi", "neymar da silva", "manuel neuer", "arjen robben","thomas mueller", "luis suarez", "philipp lahm", "zlatan ibrahimovic", "andres iniesta", "angel di maría";
var word = words[Math.floor((Math.random() * words.length))];
var letters = [];
var quantity_of_spaces = 0;

// Start each game.
function gameSetup(word) {
	var string = "";
	for (var i = 0; i < word.length; i++) {
		if (word.charAt(i) === " ") {
			string += '<p class="letter no-underscore" id="letter' + i + '">&nbsp</p>'
			quantity_of_spaces++;
		} else {
			string += '<p class="letter" id="letter' + i + '">&nbsp</p>';
		}
		letters.push(word.charAt(i));
	}
	document.getElementById("word").innerHTML = string;
}

function reset() {
	for (var i = 0; i < wrong_guesses.length; i++) {
		document.getElementById("wrong-letter" + (i + 1)).innerHTML = "";
	}
	for (var i = 0; i < letters.length; i++) {
		document.getElementById("word").innerHTML = "&nbsp";
	}
	letters = [];
	listen = true;
	guesses = 0;
	wrong_guesses = [];
	good_guesses = [];
	listen = true;
	quantity_of_spaces = 0;
	document.getElementById("left-guesses-box").innerHTML = "<hr><h3>You have <span id=\"left-guesses\">5</span> incorrect guesses left before you lose.</h3>";
	document.getElementById("left-guesses-box").style.height = "";
	document.getElementById("bad-guess-counter").innerHTML = "";
	document.getElementById("left-guesses").innerHTML = " " + 5 + " ";
	document.getElementById("playboard").innerHTML = '<img src="assets/images/hm0.png">';
	document.getElementById("playboard").style.marginTop = "180px";
	document.getElementById("playboard").style.height = "";
	document.getElementById("word").innerHTML = "";
	var word = words[Math.floor((Math.random() * words.length))];
	gameSetup(word)
}

// Functions.
document.onkeyup = function(event) {

	function alreadyGuessed(userGuess) {
		for (var i = 0; i < wrong_guesses.length; i++) {
			if (userGuess === wrong_guesses[i]) {
				return true;
			}
		}

		for (var i = 0; i < good_guesses.length; i++) {
			if (userGuess === good_guesses[i]) {
				return true;
			}
		}
		return false;
	}

	function inAlphabet(userGuess) {
		for (var i = 0; i < alphabet.length; i++) {
			if (userGuess === alphabet[i]) {
				return true;
			}
		}
		return false;
	}

	function checkLetter(userGuess) {
		if (!inAlphabet(userGuess)) {
			alert("\"" + userGuess.toUpperCase() + "\" is not in the alphabet. Try again.")
			return;
		} else if (alreadyGuessed(userGuess)) {
			alert("You've already guessed \"" + userGuess.toUpperCase() + 
				"\"...!");
			return;
		} else {
			guesses++
			var match = false;
			for (var i = 0; i < letters.length; i++) {
				if (userGuess === letters[i]) {
					document.getElementById("letter" + i).innerHTML = userGuess;
					good_guesses.push(userGuess);
					match = true;
				}
				if (good_guesses.length === (letters.length - quantity_of_spaces)) {
					listen = false;
					total_score++;
					document.getElementById("left-guesses-box").innerHTML = "";
					document.getElementById("left-guesses-box").style.height = "0px";
					document.getElementById("playboard").style.height = "320px";
					document.getElementById("playboard").style.marginTop = "120px";
					document.getElementById("playboard").innerHTML = '<iframe width="732" height="446" src="https://www.youtube.com/embed/82wM8s-_2RM" frameborder="0" allowfullscreen></iframe>'

					document.getElementById("total-score").innerHTML = total_score;
					break;
				}
			}
			if (!match) {
				wrong_guesses.push(userGuess);
				document.getElementById("wrong-letter" + wrong_guesses.length).innerHTML = userGuess;
				if (wrong_guesses.length > 1) {
					document.getElementById("bad-guess-counter").innerHTML = "Your " + wrong_guesses.length + " bad guesses so far are: ";
				} else {
					document.getElementById("bad-guess-counter").innerHTML = "Your first bad guess was:";
				}
			
				document.getElementById("left-guesses").innerHTML = " " + 5 - wrong_guesses.length + " ";
				document.getElementById("playboard").innerHTML = '<img src="assets/images/hm' + wrong_guesses.length + '.png">'
				if (wrong_guesses.length === 5) {
					listen = false;
				}
			}
		}
	};

	if (listen) {
		checkLetter(event.key.toLowerCase());
	};
}

//Start the game.
gameSetup(word);