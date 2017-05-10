$(document).ready(function(){
	//Initialize screen by hiding timer and question containers
//	$("#timerContainer").toggle();
//	$("#questionContainer").toggle();
	var correctAnswer
	//Start Game
	$("#startGame").on("click", function(){
		startGame();
	})
	$(".answersListContainer").on("click", function(){
		var selectedAnswer = $(this).children().attr("data-answer");
		console.log(selectedAnswer);
		correctAnswer = $("#hideAnswer").val();

		if (selectedAnswer == correctAnswer){
			console.log("Yay")
		}

		else {
			console.log("nay")
		}


	})
})

function startGame(){
	var questions;

	//Start countdown
	countDown("start", 3);

	setTimeout(function(){
		countDown("stop");
		displayQuestion();
		countDown("start", 10);
		setTimeout(function(){
			countDown("stop");
		}, 10000);
	}, 1000);

	//Show timer
	$("#timerContainer").toggle();
}

function countDown(option, countdownTime) {
	var timer = {
		time: countdownTime,
		start: function() {
			intervalId = setInterval(timer.counter, 1000);
		},
		stop: function() {
			clearInterval(intervalId);
		},
		counter: function() {
			timer.time--;
			console.log(timer.time);
			$("#timer").text(timer.time)
		}
	}

	if (option == "start") {
		timer.start(countdownTime);
	}
	else if (option == "stop") {
		timer.stop();
		console.log("time up");
	}
}

function displayQuestion() {
	//Get Question
	$.ajax({
		type: "GET",
		url: "assets/javascript/questions.json"
	}).done(function(response){
		myQuestion = response;
		console.log(myQuestion)
		var questionText = myQuestion.questions[0].questionText;

		$("#questionContainer").toggle();
		$("#answersContainer").toggle();
		$("#question").text(questionText);


		for (var i = 0; i < myQuestion.questions[0].possibleAnswers.length; i++){
			j = i+1
			var answerList = $("#al" + j);
			console.log(answerList);
			answerItem = $("<li>" + myQuestion.questions[0].possibleAnswers[i] + "</li>");
			answerItem.attr("data-answer", i+1);
			answerItem.addClass("answers");
			answerList.append(answerItem)
		}

		correctAnswer = myQuestion.questions[0].correctAnswer
		$("#hideAnswer").val(correctAnswer);
	});
}


//  Our stopwatch object.
var stopwatch = {
	time: 0,
	reset: function() {
		stopwatch.time = 0;
		stopwatch.lap = 1;
		//  TODO: Change the "display" div to "00:00."
		$("#display").html("00:00");
	},
	start: function() {
		intervalId = setInterval(stopwatch.count, 1000);
	},
	stop: function() {
		clearInterval(intervalId);
	},
	recordLap: function() {
	},
	count: function() {
		stopwatch.time++;
		var currentTime = stopwatch.timeConverter(stopwatch.time)
		console.log(currentTime)
		$("#display").html(currentTime)
	},
	timeConverter: function(t) {
		//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (minutes === 0) {
			minutes = "00";
		}
		else if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return minutes + ":" + seconds;
	}
};


