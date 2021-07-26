var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

// Starting the game
var started = false;
var level = 0;
$(document).on("keypress", function() {
  
  if (!started) {
    $("#level-title").text("level" + level);
    newSequence();
    started = true;
  }
});

// On clicking any btn
$(".btn").click( function() {

  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkPattern(userPattern.length - 1);
});

// Checking the pattern
function checkPattern (currentLvl) {
  
  if (gamePattern[currentLvl] === userPattern[currentLvl]) {
    if(gamePattern.length === userPattern.length) {
      
      setTimeout(() => {
        newSequence();
      }, 1000);
    }
  }
  
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    
    startOver();
  }
}

// Generating new sequence
function newSequence() {
  
  userPattern = [];
  
  level++;
  $("#level-title").text("Level " + level);
  
  var randomNum = Math.floor(Math.random() * 4);
  
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColor);
}

// Play sound on clicking the button
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add an effect on clicking the button
function animatePress(currentColor) {
  
  $("#" + currentColor).addClass("pressed");
  
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){

  level = 0;
  started = false;
  gamePattern = [];
}
