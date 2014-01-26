Math.random0 = function(y) {
	y++;
	return Math.floor(state.mt.random() * y);
}

Math.random1 = function(y) {
	return 1 + Math.floor(state.mt.random() * y);
}

var state = {
	answer: -1,
	correct: 0,
	wrong: 0,
	cant_correct: true,
	mt: null
};

function init() {
	state.mt = new MersenneTwister();
};

// Task: Test sums of the form (10+x) - y, where y > x.
// y is between 3-9 since y<3 is not interesting (you can get 11-2, 10-2 or 10-1)
// x is actually < (y-1) because when 9s are easy to work out (12-3 ... 18-9)
function newFlashcard() {

/*	var x = Math.random1(8);
	var y = x + 1 + Math.random1(8 - x); */

	// Generate y first, between 3 and 9
	var y = 2 + Math.random1(7);
	// Generate x, smaller than y
	var x = Math.random0(y - 2);

	x += 10;
	var text = x + " - " + y;

	if (state.answer == x - y) {
		newFlashcard();
		return;
	}

	state.answer = x - y;

 	$("#question").html(text);
 	$("#answer").val("").focus();
 	state.cant_correct = false;
}

function updateStats() {
	$("#stats_correct").text(state.correct);
	$("#stats_wrong").text(state.wrong);
}

function checkAnswer() {
	var theirs = $("#answer").val();
	var ours = state.answer;

	if (theirs == ours) {
		correct();
	} else {
		wrong();
	}
}

function correct() {
	$("#correct").show().delay(500).fadeOut(1500);

	if (!state.cant_correct) state.correct++;
	updateStats();

	window.setTimeout(function() {
		newFlashcard();
	}, 500);
}

function wrong() {
	$("#wrong").show().delay(500).fadeOut(1500);

	if (!state.cant_correct) state.wrong++;
	state.cant_correct = true;
	updateStats();
}

$(function() {
	$("#answer").on("keypress", function(ev) {
		if (ev.keyCode == 13)
			checkAnswer();
	});

	init();
	newFlashcard();
});
