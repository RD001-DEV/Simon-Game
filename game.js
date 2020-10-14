
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var starts = false;
var level = 0;

$(document).keypress(() => {
  if(!starts) {
    $('#level-title').text(`Level ${level}`)
    starts = !starts;
    nextSequence();
  }
})

$(".btn").click( function() {
  if (gamePattern.length === 0) {
    alert("Press Any Key on the keybord to Start")
  } else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++

  $('#level-title').text(`Level ${level}`)

  var randoNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randoNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence()
      },1000);
    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    },200);

      $('#level-title').text("Game over, Press Any Key to Restart");
      gameOver();
  };
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed")
  setTimeout(() => {
    $(`#${currentColour}`).removeClass('pressed');
  },100);

}

function gameOver() {
  level = [];
  gamePattern = [];
  starts = !starts;
}

