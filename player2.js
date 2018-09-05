
/*window.onload = function() {
    document.getElementById("start-button").click = function() {
      startGame();
    };
  
    function startGame() {

    }
}*/

//Canvas config
var canvas2 = document.getElementById('player-2');
var ctx2 = canvas2.getContext('2d')


//Variables globales
var tomates2 = []
var botellas2 = []
var obstaculos2 = []
var score2 = 0;
var notas2 = []
var interval2;
var frames2 = 0;
var time2 = 0;
var images2 = {
    bg2:"./images/stage2.jpg",
    personaje2:"./images/guitarist2.png",
    tomate2: "./images/tomato2.png",
    botella2:"./images/water2.png",
    nota2: "./images/music-player2.png"

}
var nivel1 = document.getElementById('nivel-1');
var nivel2 = document.getElementById('nivel-2');
var nivel3 = document.getElementById('nivel-3');
var nivel4 = document.getElementById('nivel-4');


//clases
class Board2{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas2.width
        this.height = canvas2.height
        this.image = document.createElement('img')
        this.image.src = images2.bg2
        this.image.onload = () => {
            this.draw()
        }
        this.music = new Audio()
        this.music.src = 'smoke.mp3'
        this.stage1=false
        this.stage2=false
        this.stage3=false
        this.stage4=false
    }
        draw(){
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx2.font = "50px Arial";
        ctx2.fillStyle = "#fff";
        ctx2.fillText("♫: " + score2,20,60);  
        ctx2.font = "40px Arial"
        ctx2.fillStyle = "white"
        ctx2.fillText("Time:" + Math.floor(time2 / 60),740,60)       
        }

       

} //clase Board

class Personaje2{
    constructor(){
        this.x = 360
        this.y = 50
        this.width = 200
        this.height = 200
        this.image = new Image()
        this.image.src = images2.personaje2
        this.image.onload = () => {
            this.draw()
        }
    }

    crashWith(item){
        var crash2 = (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y)
        if(crash2) item.crash2.play()
        return crash2;
    }

    draw(){
          ctx2.drawImage(this.image, this.x, this.y,this.width, this.height)
    }

    goRight2(){
        this.x+=180
      }
      goLeft2(){
        this.x-=180
      }

} // clase Personaje 1 



// clase Obstaculo
class Obstaculos2{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.tipo = tipo
        this.width = 30
        this.height = 30
    }

    draw(){
        this.y-=2
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
  
// clase Tomates
class Tomates2{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.tipo = tipo
        this.width = 30
        this.height = 30
        this.image = new Image()
        this.image.src = images2.tomate2
        this.image.onload = () => {
            this.draw()
        } 
        this.crash2 = new Audio()
         this.crash2.src = "boo.mp3"
    }

    draw(){
        this.y-=2
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// clase Notas Musicales 
class Notas2{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 30
        this.tipo = tipo
        this.image = new Image()
        this.image.src = images2.nota2
        this.image.onload = () => {
            this.draw()
        } 
         this.crash2 = new Audio()
         this.crash2.src = "applause.mp3"
    }

    draw(){
        this.y-=2
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// Clase Botellas 
class Botellas2{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 30
        this.tipo = tipo
        this.image = new Image()
        this.image.src = images2.botella2
        this.image.onload = () => {
            this.draw()
        } 
        this.crash2 = new Audio()
        this.crash2.src = "boo.mp3"
    }

    draw(){
        this.y-=2
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


//Instancias
var board2 = new Board2()
var personaje2 = new Personaje2()
var obstaculo2 = new Obstaculos2()
var nota2 = new Notas2 ()
var tomate2 = new Tomates2()
var botella2 = new Botellas2()


//Funciones principales
function update2(){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height)
    board2.draw()
    personaje2.draw()
    drawObstaculos2()
    checkCollitions2()
    if((time2/60)===10)gameOver()
    time2++
}

function start2(){
    if(interval2) return
    if(board2.stage1 == true) {
        interval2 = setInterval(update2, 1000/60);
        var obstaculosInterval2 = setInterval(generateObstaculos2,5000)
    }
    if(board2.stage2 == true) {
        interval2 = setInterval(update2, 1000/60);
        var obstaculosInterval2 = setInterval(generateObstaculos2,4000)
    }
    if(board2.stage3 == true) {
        interval2 = setInterval(update2, 1000/60);
        var obstaculosInterval2 = setInterval(generateObstaculos2,3000)
    }
    if(board2.stage4 == true) {
        interval2 = setInterval(update2, 1000/60);
        var obstaculosInterval2 = setInterval(generateObstaculos2,2000)
    }
}


function gameOver2(){
    clearInterval(interval)
    ctx2.font = "80px Avenir"
    ctx2.fillText("Game Over", 50,250)
    ctx2.font = "50px Avenir"
    ctx2.fillStyle = "yellow"
    ctx2.fillText("Press 'esc' to restart", 50,300)
    interval2 = null
}

//funciones Auxiliares

function generateObstaculos2(){
    if(frames2 % 200 === 0){
        var obstaculo6 = new Tomates2(90,"Tomate")
        var obstaculo7 = new Tomates2(270,"Tomate")
        var obstaculo8 = new Notas2(450,"Nota")
        var obstaculo9 = new Botellas2(630,"Botella")
        var obstaculo10 = new Botellas2(810,"Botella")
        var arrayOriginal2 = [obstaculo6,obstaculo7,obstaculo8,obstaculo9,obstaculo10]
        var aux2 = 0
        for(var i =0; i<5;i++){
            azar2 = Math.floor(Math.random()*i)
            aux2 = arrayOriginal2[i].x
            arrayOriginal2[i].x = arrayOriginal2[azar2].x
            arrayOriginal2[azar2].x= aux2
        }

        obstaculos2.push(arrayOriginal2[0],arrayOriginal2[1],arrayOriginal2[2],arrayOriginal2[3],arrayOriginal2[4])
    } 
}

function drawObstaculos2(){
    obstaculos2.forEach(function(obstaculo2){
        obstaculo2.draw()
    })
}


function checkCollitions2(){
    obstaculos2.forEach(function(obstaculo2){
        if(personaje2.crashWith(obstaculo2)){
            var pos2 = obstaculos2.indexOf(obstaculo2);
            obstaculos2.splice(obstaculo2);
            if(obstaculo2.tipo=="Tomate"){
                console.log ("Resta")
                score2--
            } 
            if(obstaculo2.tipo=="Botella"){
                console.log ("Resta")
                score2--
            }
            if(obstaculo2.tipo=="Nota"){
                console.log("Suma")
                score2++
            }
        }
    })
}


//los observadores


 document.onkeydown=function(e){
    switch(e.keyCode) {
      case 65:
      if (personaje2.x<180) return
      personaje2.goLeft2()
      break;
      case 68: 
      if (personaje2.x>580)return
      personaje2.goRight2()
      break;
     }

      if(e.key = "Enter"){
      start2()
      board.music.play()
    }

  }




 




 
 


  




 

