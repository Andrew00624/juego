
//Canvas config
var canvas = document.getElementById('player-1');
var ctx = canvas.getContext('2d')


//Variables globales
var tomates = []
var botellas = []
var obstaculos = []
var score = 0;
var notas = []
var interval;
var frames = 0;
var time = 0;
var images = {
    bg:"./images/stage.jpg",
    personaje:"./images/guitarist.png",
    tomate: "./images/tomato.png",
    botella:"./images/water.png",
    nota: "./images/music-player.png"

}
var nivel1 = document.getElementById('nivel-1');
var nivel2 = document.getElementById('nivel-2');
var nivel3 = document.getElementById('nivel-3');
var nivel4 = document.getElementById('nivel-4');


//clases
class Board{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.bg
        this.image.onload = () => {
            this.draw()
        }
        this.smoke = new Audio()
        this.smoke.src = 'smoke.mp3'
        this.back = new Audio()
        this.back.src = 'back.mp3'
        this.fuel = new Audio()
        this.fuel.src = 'fuel.mp3'
        this.chona = new Audio()
        this.chona.src = 'chona.mp3'
        this.stage1=false
        this.stage2=false
        this.stage3=false
        this.stage4=false
    }
        draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.font = "50px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("♫: " + score,20,60);   
        ctx.font = "40px Arial"
        ctx.fillStyle = "white"
        ctx.fillText("Time:" + Math.floor(time / 60),740,60)    
        }

       

} //clase Board

class Personaje{
    constructor(){
        this.x = 360
        this.y = 50
        this.width = 200
        this.height = 200
        this.image = new Image()
        this.image.src = images.personaje
        this.image.onload = () => {
        this.draw()
        }
    }

    crashWith(item){
        var crash = (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y)
        if(crash) item.crash.play()
        return crash;
    }

    draw(){
          ctx.drawImage(this.image, this.x, this.y,this.width, this.height)
    }

    goRight(){
        this.x+=180
      }
      goLeft(){
        this.x-=180
      }
      

} // clase Personaje 1 



// clase Obstaculo
class Obstaculos{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.tipo = tipo
        this.width = 30
        this.height = 30
    }

    draw(){
        this.y-=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
  
// clase Tomates
class Tomates{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.tipo = tipo
        this.width = 30
        this.height = 30
        this.image = new Image()
        this.image.src = images.tomate
        this.image.onload = () => {
            this.draw()
        } 
        this.crash = new Audio()
        this.crash.src = "boo.mp3"
    }

    draw(){
        this.y-=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// clase Notas Musicales 
class Notas{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 30
        this.tipo = tipo
        this.image = new Image()
        this.image.src = images.nota
        this.image.onload = () => {
            this.draw()
        } 
         this.crash = new Audio()
         this.crash.src = "applause.mp3"
    }

    draw(){
        this.y-=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// Clase Botellas 
class Botellas{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 30
        this.tipo = tipo
        this.image = new Image()
        this.image.src = images.botella
        this.image.onload = () => {
            this.draw()
        } 
        this.crash = new Audio()
        this.crash.src = "boo.mp3"
    }

    draw(){
        this.y-=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


//Instancias
var board = new Board()
var personaje = new Personaje()
var obstaculo = new Obstaculos()
var nota = new Notas ()
var tomate = new Tomates()
var botella = new Botellas()


//Funciones principales
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    personaje.draw()
    drawObstaculos()
    checkCollitions()
    if((time/60)===60)gameOver()
    time++
}

function start(){
    if(interval) return
    if(board.stage1 == true) {
        interval = setInterval(update, 1000/60);
        var obstaculosInterval = setInterval(generateObstaculos,5000)
    }
    if(board.stage2 == true) {
        interval = setInterval(update, 1000/60);
        var obstaculosInterval = setInterval(generateObstaculos,4000)
    }
    if(board.stage3 == true) {
        interval = setInterval(update, 1000/60);
        var obstaculosInterval = setInterval(generateObstaculos,3000)
    }
    if(board.stage4 == true) {
        interval = setInterval(update, 1000/60);
        var obstaculosInterval = setInterval(generateObstaculos,2000)
    }
    
}


function gameOver(){
        clearInterval(interval)
        ctx.font = "80px Avenir"
        ctx.fillText("Game Over", 50,250)
        ctx.font = "50px Avenir"
        ctx.fillStyle = "yellow"
        ctx.fillText("Press 'esc' to restart", 50,300)
        interval = null

}

//funciones Auxiliares

function generateObstaculos(){
    if(frames % 200 === 0){
        var obstaculo1 = new Tomates(90,"Tomate")
        var obstaculo2 = new Tomates(270,"Tomate")
        var obstaculo3 = new Notas(450,"Nota")
        var obstaculo4 = new Botellas(630,"Botella")
        var obstaculo5 = new Botellas(810,"Botella")
        var arrayOriginal = [obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5]
        var aux = 0
        for(var i =0; i<5;i++){
            azar = Math.floor(Math.random()*i)
            aux = arrayOriginal[i].x
            arrayOriginal[i].x = arrayOriginal[azar].x
            arrayOriginal[azar].x= aux
        }

        obstaculos.push(arrayOriginal[0],arrayOriginal[1],arrayOriginal[2],arrayOriginal[3],arrayOriginal[4])
    } 
}

function drawObstaculos(){
    obstaculos.forEach(function(obstaculo){
        obstaculo.draw()
    })
}


function checkCollitions(){
    obstaculos.forEach(function(obstaculo){
        if(personaje.crashWith(obstaculo)){
            var pos = obstaculos.indexOf(obstaculo);
            obstaculos.splice(obstaculo);
            if(obstaculo.tipo=="Tomate"){
                score--
            } 
            if(obstaculo.tipo=="Botella"){
                score--
            }
            if(obstaculo.tipo=="Nota"){
                score++
            }
        }
    })
}




//los observadores

nivel1.addEventListener ("click", function(){
    board.stage1 = true;
    board2.stage1 = true;
    board.smoke.play()
    start();
    start2();
})

nivel2.addEventListener ("click", function(){
    board.stage2 = true;
    board2.stage2 = true;
    board.back.play()
    start();
    start2();
})

nivel3.addEventListener ("click", function(){
    board.stage3 = true;
    board2.stage3 = true;
    board.fuel.play()
    start();
    start2();
})

nivel4.addEventListener ("click", function(){
    board.stage4 = true;
    board2.stage4 = true;
    board.chona.play()
    start();
    start2();
})


 document.onkeydown=function(e){
    switch(e.keyCode) {
      case 37:
        if (personaje.x<180) return
        personaje.goLeft()
        break;
      case 39: 
        if (personaje.x>580)return
        personaje.goRight()
        break;
      case 65:
        if (personaje2.x<180) return
        personaje2.goLeft2()
        break;
      case 68: 
        if (personaje2.x>580)return
        personaje2.goRight2()
        break;
     

     }

  }






 




 
 


  




 

