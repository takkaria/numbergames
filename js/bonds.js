Math.random1 = function(y) {
	return Math.floor(Math.random() * (y+1));
}

var state = {
	answer: -1,
	correct: 0,
	wrong: 0,
	cant_correct: true,
};

function newFlashcard() {
	var x = Math.random1(8);
	var y = x + 1 + Math.random1(8 - x);

	x += 10;
	var text = x + " - " + y;

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

	state.wrong++;
	state.cant_correct = true;
	updateStats();
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
