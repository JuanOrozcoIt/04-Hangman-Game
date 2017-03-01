var guesses = 0;
var wrong_guesses = [];
var right_guesses = [];
var listen = true;
var total_score = 0;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var words = ["lionel messi", "cristiano ronaldo", "manuel neuer", "arjen robben", "thomas mueller", "luis suarez", "philipp lahm", "zlatan ibrahimovic", "andres iniesta", "angel di maria"];
var word = words[Math.floor((Math.random() * words.length))];
var letters = [];
var spaces_quantity = 0;


function wordSetup(word) {
	var string = "";
	for (var i = 0; i < word.length; i++) {
		if (word.charAt(i) === " ") {
			string += '<p class="letter no-underscore" id="letter' + i + '">&nbsp</p>'
			spaces_quantity++;
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
	right_guesses = [];
	listen = true;
	spaces_quantity = 0;
	document.getElementById("guesses-left-box").innerHTML = "<hr><h3>You have <span id=\"guesses-left\">6</span> incorrect guesses left before you lose.</h3>";
	document.getElementById("guesses-left-box").style.height = "";
	document.getElementById("wrong-guess-counter").innerHTML = "";
	document.getElementById("guesses-left").innerHTML = " " + 6 + " ";
	document.getElementById("playboard").innerHTML = '<img src="assets/images/hm0.png">';
	document.getElementById("playboard").style.marginTop = "180px";
	document.getElementById("playboard").style.height = "";
	document.getElementById("word").innerHTML = "";
	var word = words[Math.floor((Math.random() * words.length))];
	wordSetup(word)
}


document.onkeyup = function(event) {

	function alreadyGuessed(userGuess) {
		for (var i = 0; i < wrong_guesses.length; i++) {
			if (userGuess === wrong_guesses[i]) {
				return true;
			}
		}

		for (var i = 0; i < right_guesses.length; i++) {
			if (userGuess === right_guesses[i]) {
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
				"\". Try another letter.");
			return;
		} else {
			guesses++
			var match = false;
			for (var i = 0; i < letters.length; i++) {
				if (userGuess === letters[i]) {
					document.getElementById("letter" + i).innerHTML = userGuess;
					right_guesses.push(userGuess);
					match = true;
				}
				if (right_guesses.length === (letters.length - spaces_quantity)) {
					listen = false;
					total_score++;
					document.getElementById("guesses-left-box").innerHTML = "";
					document.getElementById("guesses-left-box").style.height = "0px";
					document.getElementById("playboard").style.height = "320px";
					document.getElementById("playboard").style.marginTop = "120px";
					document.getElementById("playboard").innerHTML = '<iframe width="680" height="320" src="https://www.youtube.com/embed/HdA5vcke8tA?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'															
					document.getElementById("total-score").innerHTML = total_score;
					break;
				}
			}
			if (!match) {
				wrong_guesses.push(userGuess);
				document.getElementById("wrong-letter" + wrong_guesses.length).innerHTML = userGuess;
				if (wrong_guesses.length > 1) {
					document.getElementById("wrong-guess-counter").innerHTML = "Your " + wrong_guesses.length + " wrong guesses so far are: ";
				} else {
					document.getElementById("wrong-guess-counter").innerHTML = "Your first wrong guess was:";
				}
			
				document.getElementById("guesses-left").innerHTML = " " + 6 - wrong_guesses.length + " ";
				document.getElementById("playboard").innerHTML = '<img src="assets/images/hm' + wrong_guesses.length + '.png">'
				if (wrong_guesses.length === 6) {
					listen = false;
				}
			}
		}
	};

	if (listen) {
		checkLetter(event.key.toLowerCase());
	};
}

wordSetup(word);