
var buttonColors= ["red", "green", "yellow", "blue"];
var gamePattern= [];
var userClickedPattern=[];
var level = 0;
var on=true;

// detects a click from users
$(".btn").click(function() {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length-1));// checks answer for every button clicks so no cheating loli

});
// event detecter for mobile phone
$("#top h1").click(function(){
    if (on){
        nextSequence();
    }
});

$(document).keypress(function(){
    if (on){
        nextSequence();
    }
    
});

// the function that checks if the button clicked is the same as the random color
function checkAnswer(currentLevel){

    // checks the user clicked button array with the game pattern for every click from the user
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

        // to check the equality of the arrays 
        if (gamePattern.length === userClickedPattern.length ) {
            
            setTimeout(nextSequence, 1000);
        }
        
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over"); //changes the background color 
        $("#top h1").text("Game Over, Press A Key/Click Me to Start Over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();

    }
} 

// the function that generates the random color
function nextSequence(){
    on=false;
    userClickedPattern = [];
    // 3rd changes the title to level 0 
    $("#level-title").text("level "+ level);
    level++;
    // 1st use random number generator to pick colors from the colors array
    var randomNumber= Math.floor( Math.random()*4 ) ;
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //2nd animitation of the chosen color button
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

// a start over function that clears all values stored inside every array
function startOver(){
    level=0;
    gamePattern=[];
    on=true;
}

function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
// creates a button animation by adding class to the clicked button 
function animatePress(button){
    $("#"+button).addClass("pressed");
    setTimeout(function (){
        $("#"+button).removeClass("pressed");
    }, 100);
}
