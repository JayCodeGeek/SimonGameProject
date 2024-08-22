$(document).ready(function () {
  // String array containing color names as values //
  let buttonColors = ["red", "blue", "green", "yellow"];
  // Empty array to store color pattern//
  let gamePattern = [];

  // Empty array to store clicked pattern //
  let userClickedPattern = [];

  // To execute nextSequence() when click on button
  $("#btnplay").click(function (e) {
    nextSequence();
    // will empty userClickPattern array so that user has to select colors from start
    for (let i = userClickedPattern.length; i >= 0; i--) {
      userClickedPattern.pop();
    }
  });

  $(document).on("keydown", function (e) {
    keyColorStore(e.key);
  });

  function keyColorStore(color) {
    switch (color) {
      case "a":
        userClickedPattern.push("green");
        colorSound("green");
        console.log(userClickedPattern);
        $("#green").fadeOut(40).fadeIn();
        break;
      case "s":
        userClickedPattern.push("red");
        console.log(userClickedPattern);
        colorSound("red");
        $("#red").fadeOut(40).fadeIn();
        break;
      case "d":
        userClickedPattern.push("yellow");
        console.log(userClickedPattern);
        colorSound("yellow");
        $("#yellow").fadeOut(40).fadeIn();
        break;
      case "f":
        userClickedPattern.push("blue");
        console.log(userClickedPattern);
        colorSound("blue");
        $("#blue").fadeOut(40).fadeIn();
        break;
      default:
        console.log(color);
        break;
    }
  }

  // button is target on which we have added eventlistener to see click event and execute function
  $(".btn").on("click", function () {
    let userChosenColor;
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    colorSound(userChosenColor);
  });


  // checks and calls the tfunction()
  $("#checkColor").on("click", function () {
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
      tfunction(true);
    } else {
      tfunction(false);
    }
    // will empty userClickPattern array so that user has to select colors from start
    for (let i = userClickedPattern.length; i >= 0; i--) {
      userClickedPattern.pop();
    }
  });

  // will empty colors pushed in gamepattern and userClickedPattern array
  $("#restart").on("click", function () {
    for (let i = gamePattern.length; i >=0; i--) {
      gamePattern.pop();
    }

    for (let i = userClickedPattern.length; i >= 0 ; i--) {
      userClickedPattern.pop();
    }
    alert("Game Restarted");
  });

  // Will execute to show whether user has selected right sequence of colors
  function tfunction(tColor) {
    if (tColor == true) {
      alert("Right Colors Selected, Keep Playing");
    } else {
      $("body").css("background-color", "coral");
      setTimeout(() => {
        $("body").css("background-color", "#011F3F");
        alert("Wrong Colors Selected, Please Restart");
      }, 100);
    }
  }

  // This function will return a random number between 0 to 3 //
  function nextSequence() {
    // floor() function will round of the value to its lowest integer.
    // random() function will generate random number between 0 to 0.99.
    let randomNumber = Math.floor(Math.random() * 4);

    // buttonColors[] is a string array that has different colors name as a values in it.
    // randomChosenColor is variable storing diff color //
    let randomChosenColor = buttonColors[randomNumber];

    // adding color to empty array //
    gamePattern.push(randomChosenColor);

    // Adding animation to color button
    $("#" + randomChosenColor)
      .fadeOut(40)
      .fadeIn();

    // calling colorSound() function for audio
    colorSound(randomChosenColor);
    console.log(gamePattern);
  }

  // Function to generate repective color sound //
  function colorSound(randomChosenColor) {
    // Using swith case to play respected color sound
    let colorSound;
    switch (randomChosenColor) {
      case "red":
        colorSound = new Audio("./sounds/red.mp3");
        colorSound.play();
        break;
      case "blue":
        colorSound = new Audio("./sounds/blue.mp3");
        colorSound.play();
        break;
      case "green":
        colorSound = new Audio("./sounds/green.mp3");
        colorSound.play();
        break;
      case "yellow":
        colorSound = new Audio("./sounds/yellow.mp3");
        colorSound.play();
        break;
      default:
        alert("color not select");
        break;
    }
  }
});
