// var startCheck = false;
var startGame = new GameData();

$(document).on("keypress", function () {
  if (startGame.gameOver === true) 
  {
    $("#level-title").text("Press Any Key to Start");
    startGame.gameOver=false;
    startGame.randomBox();
  }
});
$("#start-btn").on("click", function () {
  if (startGame.gameOver === true) 
  {
    $("#level-title").text("Press Any Key to Start");
    startGame.gameOver=false;
    startGame.randomBox();
  }
});

$(".btns").on("click", function () {
  $(this)
    .addClass("pressed")
    .animate({ opacity: 1 }, 200, function () {
      $(this).removeClass("pressed").css("opacity", "");
    });
  if (startGame.gameOver === false) {
    startGame.playSound($(this).attr("id"));
    startGame.check($(this).attr("id"));
  }
  else
  {
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
  }
});

function GameData() 
{
  this.level = 0;
  this.clickOrder = [];
  this.clickTime = 0;
  this.gameOver = true;

  // Methods
    this.randomBox = function () 
    {
        let randomNum = Math.floor(Math.random() * 4);
        let select;
        switch (randomNum) 
        {
          case 0:
            this.clickOrder.push("green");
            break;
          case 1:
            this.clickOrder.push("red");
            break;
          case 2:
            this.clickOrder.push("yellow");
            break;
          case 3:
            this.clickOrder.push("blue");
            break;
          default:
            break;
        }
        select="#" + this.clickOrder[this.clickOrder.length - 1];
        console.log(select);
        setTimeout(function () {
        document.querySelector(select).classList.add("pressed");
        }, 500);
        this.playSound(this.clickOrder[this.clickOrder.length - 1]);

        $("#" + this.clickOrder[this.clickOrder.length - 1]).animate({ opacity: 1 },800,function () {
            $(this).removeClass("pressed").css("opacity", "");
          });
    };
    this.playSound=function (soundType) 
    {
        switch (soundType) 
        {
          case "blue":
            var blue=new Audio("sounds/blue.mp3");
            blue.play();
            break;
          case "green":
            var green=new Audio("sounds/green.mp3");
            green.play();
            break;
          case 'red':
            var red=new Audio("sounds/red.mp3");
            red.play();
            break;
          case "yellow":
            var yellow=new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
          default:
            var wrong=new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
        }
    }
  this.reset = function () {
    this.level = 0;
    this.clickOrder = [];
    this.clickTime = 0;
  };

  this.check = function (id) {
    let ans = false;
    if (id === this.clickOrder[this.clickTime]) {
        this.clickTime += 1;
      ans = true;
    } else {
      ans = false;
    }
    // ans = startGame.check($(this).attr("id"));
    
    if (ans === true && this.clickTime === this.clickOrder.length) 
    {
        this.clickTime=0;
      ++(this.level);
      console.log(this.clickTime + " " + this.clickOrder.length);
      $("#level-title").text("Level " + this.level);
      this.randomBox();
    }
    else if (ans === false) {
      this.gameOver = true;
      $("body").addClass("game-over");
      $("body").animate({ opacity: 1 },200,function () {
        $(this).removeClass("game-over").css("opacity", "");
      });
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
      $("#level-title").text("Game Over, Press any Key to RESTART");
    //   startCheck = false;
      this.reset();
    }
  };
}
