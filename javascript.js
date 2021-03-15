// Déclaration de variables
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Pas très rigoureux pour le moi de février
var DayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var d = new Date();
var thisYear = d.getFullYear();
var thisMonth = d.getMonth();
var thisDate = d.getDate();
var thisDay = d.getDay();
var monthDec = 0;

// Déclaration des anniversaires						
						//NAME, DD, MM, YYYY le nom est entre guillemets
var birthday = [["Name", 1, 1, 2000],
				["Name2", 2, 2, 2001]]

// Montre les informations dès le chargement de la page
MONTH(0);
Time();

// Actualise l'heure toutes les secondes
setInterval(Time, 1000);

// Affiche l'heure
function Time() {
	var d = new Date();
	document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

// Test si c'est l'anniversaire de quelqu'un
function anniv(test, day, month) {
	var long = birthday.length;
	var state = false;
	var who = 0;

	for (i = 0; i < long; i++) {
		if(day == birthday[i][1] && month == birthday[i][2]) {
			state = true;
			who = i;
		}
	}

	if(test == 1) {
		var birth = new Date(birthday[who][3], birthday[who][2]-1, birthday[who][1]);
		var n = birth.toDateString();
		alert("C'est l'anniversaire de: " + birthday[who][0] + " - " + n);
	} else {
		return state;
	}
}

// Fonction pour montrer le calendrier avec les bons jours
function MONTH(Dec){
	if(Dec == 0) {monthDec = 0;}
	monthDec += Dec;
	var newYear = thisYear + (thisMonth + monthDec - (thisMonth + monthDec) % 12) / 12;
	var newMonth = (thisMonth + monthDec) % 12;
	var first = (new Date(newYear, newMonth, 1)).getDay() - 1;
	var last = (first + DayInMonth[newMonth] - 22) % 7;
	var passed = 0;
	var text = "";
	var i;

	// passed days
	for (i = 0; i < first; i++) {
		if(newMonth != 0) {
			a = DayInMonth[newMonth-1]+1-first+i;
		} else {
			a = DayInMonth[11]+1-first+i;
		}
		if(newMonth > thisMonth || newYear > thisYear) {
			text += "<li>" + a + "</li>";
		} else {
			text += "<li><del>" + a + "</del></li>";
		}

	}

	// current days
	for (i = 1; i < DayInMonth[newMonth]+1; i++) {
		if(anniv(0, i, newMonth+1)) {
			if(thisDate == i && monthDec == 0){
				text += "<li><span class='party active' onclick=anniv(1,"+i+","+(newMonth+1)+")>" + i + "</span></li>";
			} else {
				text += "<li><span class=party onclick=anniv(1,"+i+","+(newMonth+1)+")>" + i + "</span></li>";
			}
		} else {
			if(thisDate == i && monthDec == 0) {
				text += "<li><span class=active>" + i + "</span></li>";
				passed = 1;
			} else {
				if(passed == 0 && newMonth == thisMonth || newMonth < thisMonth && newYear <= thisYear || newYear < thisYear){
					text += "<li><b><del>" + i + "</del></b></li>";
				} else {
					text += "<li><b>" + i + "</b></li>";
				}
			}
		}
	}

	// next days
	for (i = 0; i < 6-last; i++) {
		a = i + 1;
		if(newMonth < thisMonth && newYear <= thisYear) {
			text += "<li><i><del>" + i + "</del></i></li>";
		} else {
			text += "<li><i>" + a + "</i></li>";
		}
	}

	// Affiche les informations calculées
	document.getElementById("year").innerHTML = newYear;
	document.getElementById("month").innerHTML = months[newMonth];
	document.getElementById("day").innerHTML = text;
}


var typep = 0; // Position du curseur
// Texte à écrire
var phrase = "Bonjour à vous utilisateur de cette page. Le html et le css sont tirés du site '"+
				"https://www.w3schools.com/howto/howto_css_calendar.asp' et le javascript a été fait par mes soins.";
// Fonction qui écrit le texte ci-dessus lorsqu'on appuie sur le clavier
function Type() {
	var text = " ";
	typep++;
	for (i = 0; i < typep; i++) {
		text += phrase.charAt(i);
	}
	// Affiche le texte
	document.getElementById("type").innerHTML = text;
}