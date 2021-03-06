var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  choosenColor = buttonColors[randomNumber];
  gamePattern.push(choosenColor);

  $("." + choosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(choosenColor);
}
$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  console.log(userClickedPattern);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(curentColor) {
  $("#" + curentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + curentColor).removeClass("pressed");
  }, 100);
}
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
  }

}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startover();
}
};
function startover(){
  started = false;
  level = 0;
  gamePattern = [];
  $(".mybutton").fadeIn();


}
$(".mybutton").click(function(){
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
    $(".mybutton").fadeOut();
  }
})