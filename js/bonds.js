Math.random1 = function(y) {
	return Math.floor(Math.random() * (y+1));
}

var answer;

function newFlashcard() {
	var x = Math.random1(8);
	var y = x + 1 + Math.random1(8 - x);

	x += 10;
	var text = x + " - " + y;

	answer = x - y;

 	$("#question").html(text);
 	$("#answer").val("").focus();
}

function checkAnswer() {
	var theirs = $("#answer").val();
	var ours = answer;

	if (theirs == ours) {
		correct();
	} else {
		wrong();
	}
}

function correct() {
	$("#correct").show();
	$("#wrong").hide();
	window.setTimeout(function() {
		newFlashcard();
	}, 500);
}

function wrong() {
	$("#correct").hide();
	$("#wrong").show();
}

$(function() {
	$("#next").click(function() {
		newFlashcard();
	});

	$("#answer").on("keypress", function(ev) {
		if (ev.keyCode == 13)
			checkAnswer();
	});

	newFlashcard();
});
