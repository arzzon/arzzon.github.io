/**CREATING INSTANCES OF THE REQUIRED ELEMENTS*/
var gameMusic;
var shapes=document.getElementsByClassName('shape');
var countDownPanel=document.getElementById('countDownPanel');
var messageBoard=document.getElementById('messageBoard');
var messageLable=document.getElementById('messageLable');
var messageCard=document.getElementById('message');
var levelCard=document.getElementById('level');
var livesCard=document.getElementById('lives');
var scoreCard=document.getElementById('score');
var playAgainBtn=document.getElementById('playAgain');
var nextLevelBtn=document.getElementById('nextLevel');
var buttons=document.getElementById('buttons');  

/**USER NAME IS FETCHED FROM THE URL*/
var url=window.location.href;
document.getElementById('userBox').innerHTML=url.substring(url.indexOf('=') + 1);

/**COUNTDOWN */
function startCounter(){
   hideShapes();/**HIDES ALL THE SHAPES BEFORE COUNTDOWN BEGINS */
   /**Start count down music*/
   countdownAudio = new Audio('./assets/audio/countdown.mp3');
   var countDownNumber=document.getElementById('countDownNumber');
   var count=3;
   messageBoard.style.display='none';
   var timerfunc=setInterval(function(){
       countDownPanel.style.backgroundColor=getColor();
       if(count==3){
        countdownAudio.play();//COUNTDOWN TIMER PLAYED ONCE
       }
       if(count>0){
           countDownNumber.innerHTML=count--;
           countDownPanel.style.display='block';
       }else if(count==0){
           countDownNumber.innerHTML='GO';
           count--;
       }else{
           clearInterval(timerfunc);
           countDownPanel.style.display='none';
           startGame();
       }
       
   }, 1000);
}

/**ALL THE SHAPES ARE SET TO INVISIBLE */
function hideShapes(){
    for(var i=0;i<3;i++){
    shapes[i].style.display='none';
    }
}

/**Starts the game*/
var score=0;//Current score
var highScore=0;//Highest Score
var timeElasped=0;//Time elapsed after starting of game
var gameTime=1000*10;//10 sec
var gameSpeed=1000;//1 sec
var currentTime;//Time when the game starts in each level
var missed=0;//Number of times the player missed to click on the shapes
var checkClicked=true; /**KEEPS TRACK OF WHETHER SHAPE HAS BEEN CLICKED OR NOT*/
var timerfunc;//Game Function
var level=1;//Level
var life=3;//Life
var nextLevelClicked=false;//Keeps track of whether nextlevel button is clicked

/**SHAPES START APPEARING RANDOMLY*/
function startGame(){
    /**Olays the music in loop */
    gameMusic = new Audio('./assets/audio/startMusic2.mp3'); 
    gameMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    gameMusic.play();
    /**If nextLevel clicked then level increases and game speed increases */
    if(nextLevelClicked){
        level++;
        gameSpeed -=level*25;
    } 
    missed=0;
    life=3;
    livesCard.innerHTML= life;
    levelCard.innerHTML= level;
    checkClicked=true;
    hideShapes();
    var date = new Date();
    currentTime = date.getTime();// START TIME GETS STORED
    timerfunc=setInterval(function(){
        var date = new Date();
        if(date.getTime()-currentTime < gameTime+1){/**CHECKS IF 10 SEC IS OVER */
            /**CHECKS IF SPHAPE WAS CLICKED */
            if(!checkClicked){
                missed++;
                life--;
                livesCard.innerHTML= life;
                gameoverAudio = new Audio('./assets/audio/missed.mp3');
                gameoverAudio.play();
            }
            /**CHECKS IF ALLOTED LIVES HAVE BEEN USED */
            if(missed==3){
                setMessage(false);
                stopPlay();
            }else{/**SHAPES ARE SHOWN RANDOMNLY */
                hideShapes();
                var id=Math.floor(Math.random() * 3); /**RETURNS A RANDOM NUMBER BETWEEN  0 TO 2 INCLUSIVE*/
                shapes[id].style.backgroundColor=getColor();
                shapes[id].style.left=Math.floor(Math.random()*720) + "px";
                shapes[id].style.top=Math.floor(Math.random()*480) + "px";
                shapes[id].style.display='block';
                checkClicked=false;
            }
        }
        else{
            /**SUCCESSFULLY COMPLETED THIS LEVEL */
            stopPlay();
            setMessage(true);
        }
    }, gameSpeed);
}
function stopPlay(){
    clearInterval(timerfunc);
    hideShapes();
    gameMusic.pause();
}

/**SET THE APPROPRIATE MESSAGE */
function setMessage(status){
    if(status){/**GAME HAS BEEN WON */
        gameoverAudio = new Audio('./assets/audio/won.mp3');
        gameoverAudio.play();
        messageBoard.style.backgroundColor='greenyellow';
        messageLable.innerHTML="Congrats!!"
        message.innerHTML="You successfully completed level "+level;
        nextLevelBtn.value='Level '+(level+1);
        playAgainBtn.style.display='block';
        nextLevelBtn.style.display='block';
        messageBoard.style.display='block';
        
    }else{/**GAME LOST */
        gameoverAudio = new Audio('./assets/audio/gameover.mp3');
        gameoverAudio.play();
        playAgainBtn.style.display='block';
        messageBoard.style.backgroundColor='red';
        messageLable.innerHTML="Game Over!!"
        message.innerHTML="Sorry!! You lost all your lives.";
        nextLevelBtn.style.display='none';
        playAgainBtn.style.display='block';
        messageBoard.style.display='block';
    }
    
}

/**IT MAKES SURE THAT THE LEVEL DOESN'T INCREASE WHEN PLAYAGAIN IS CLICKED*/
function playAgain(){
    score=0;
    scoreCard.innerHTML=score;
    nextLevelClicked=false;
    startCounter();
}
function nextLevel(){
    nextLevelClicked=true;
    startCounter();
}

/**CALLED WHEN A SHAPE IS CLICKED */
function clicked(id){
    clickAudio = new Audio('./assets/audio/clickMusic.mp3');
    clickAudio.play();
    document.getElementById(id).style.display='none';
    score++;//
    scoreCard.innerHTML= score;
    checkClicked=true;
}

/** GENERATES RANDOM COLOR*/
function getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }  