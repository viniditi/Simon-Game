let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let max_level = 0;

$(document).on("keydown", function() {  
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
 
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
 
  playSound(userChosenColour);
  animatePress(userChosenColour);
 
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
 
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      if (max_level <= level) {
        max_level = level;
      }
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Max points:"+ max_level +" Press Enter Key to Restart");
 
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      setTimeout(function () {
        startOver();
      }, 200);
    }
}
 
function nextSequence() {
  userClickedPattern = [];

  $("#level-title").text("Level " + (++level));
 
  let randomNumber = Math.floor(Math.random() * 4);
 
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 
  playSound(randomChosenColour);
}
 
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
 
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3"); 

  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}