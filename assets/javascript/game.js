var guesses = 0;
var bad_guesses = [];
var good_guesses = [];
var keep_listening = true;
var total_score = 0;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var words = ["cristiano ronaldo", "lionel messi", "neymar da silva"];
var word = words[Math.floor((Math.random() * words.length))];
var letters = [];
var number_of_spaces = 0;


function wordSetup(word) {
	var string = "";
	for (var i = 0; i < word.length; i++) {
		if (word.charAt(i) === " ") {
			string += '<p class="letter no-underscore" id="letter' + i + '">&nbsp</p>'
			number_of_spaces++;
		} else {
			string += '<p class="letter" id="letter' + i + '">&nbsp</p>';
		}
		letters.push(word.charAt(i));
	}
	document.getElementById("word").innerHTML = string;
}

function reset() {
	for (var i = 0; i < bad_guesses.length; i++) {
		document.getElementById("wrong-letter" + (i + 1)).innerHTML = "";
	}
	for (var i = 0; i < letters.length; i++) {
		document.getElementById("word").innerHTML = "&nbsp";
	}
	letters = [];
	keep_listening = true;
	guesses = 0;
	bad_guesses = [];
	good_guesses = [];
	keep_listening = true;
	number_of_spaces = 0;
	document.getElementById("guesses-remaining-box").innerHTML = "<hr><h3>You have <span id=\"guesses-remaining\">6</span> incorrect guesses left before you lose.</h3>";
	document.getElementById("guesses-remaining-box").style.height = "";
	document.getElementById("bad-guess-counter").innerHTML = "";
	document.getElementById("guesses-remaining").innerHTML = " " + 6 + " ";
	document.getElementById("playboard").innerHTML = '<img src="assets/images/hm0.png">';
	document.getElementById("playboard").style.marginTop = "180px";
	document.getElementById("playboard").style.height = "";
	document.getElementById("word").innerHTML = "";
	var word = words[Math.floor((Math.random() * words.length))];
	wordSetup(word)
}


document.onkeyup = function(event) {

	function alreadyGuessed(userGuess) {
		for (var i = 0; i < bad_guesses.length; i++) {
			if (userGuess === bad_guesses[i]) {
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
				"\". Please try to pay more attention to what you're doing.");
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
				if (good_guesses.length === (letters.length - number_of_spaces)) {
					keep_listening = false;
					total_score++;
					document.getElementById("guesses-remaining-box").innerHTML = "";
					document.getElementById("guesses-remaining-box").style.height = "0px";
					document.getElementById("playboard").style.height = "320px";
					document.getElementById("playboard").style.marginTop = "120px";
					document.getElementById("playboard").innerHTML = '<iframe width="732" height="446" src="https://www.youtube.com/embed/82wM8s-_2RM" frameborder="0" allowfullscreen></iframe>'

					document.getElementById("total-score").innerHTML = total_score;
					break;
				}
			}
			if (!match) {
				bad_guesses.push(userGuess);
				document.getElementById("wrong-letter" + bad_guesses.length).innerHTML = userGuess;
				if (bad_guesses.length > 1) {
					document.getElementById("bad-guess-counter").innerHTML = "Your " + bad_guesses.length + " bad guesses so far are: ";
				} else {
					document.getElementById("bad-guess-counter").innerHTML = "Your first bad guess was:";
				}
			
				document.getElementById("guesses-remaining").innerHTML = " " + 6 - bad_guesses.length + " ";
				document.getElementById("playboard").innerHTML = '<img src="assets/images/hm' + bad_guesses.length + '.png">'
				if (bad_guesses.length === 6) {
					keep_listening = false;
				}
			}
		}
	};

	if (keep_listening) {
		checkLetter(event.key.toLowerCase());
	};
}

wordSetup(word);