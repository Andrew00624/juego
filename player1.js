
//Canvas 
var canvas = document.getElementById('player-1');
var ctx = canvas.getContext('2d')

//Variables Globales
var tomates = []
var botellas = []
var obstaculos = []
var score = 0
var notas = []
var interval;
var obstaculosInterval
var frames = 0;
var time = 0;
var images = {
    bg:"./images/stage.jpg",
    personaje:"./images/guitarist.png",
    tomate: "./images/tomato.png",
    botella:"./images/bottle.png",
    nota: "./images/note.png"

}
var nivel1 = document.getElementById('nivel-1');
var nivel2 = document.getElementById('nivel-2');
var nivel3 = document.getElementById('nivel-3');
var nivel4 = document.getElementById('nivel-4');

//Clases
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
        ctx.font = "40px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("♫: " + score,20,60);   
        ctx.font = "30px Arial"
        ctx.fillStyle = "white"
        ctx.fillText("Tiempo: " + Math.floor(time / 60),730,60)  
        }  
}

class Personaje{
    constructor(){
        this.x = 360
        this.y = 20
        this.width = 170
        this.height = 240
        this.image1 = new Image()
        this.image1.src = "./images/personaje1.png"
        this.image2 = new Image()
        this.image2.src = "./images/personaje2.png"
        this.image3 = new Image()
        this.image3.src = "./images/personaje3.png"
        this.image4 = new Image()
        this.image4.src = "./images/personaje4.png"
        this.image5 = new Image()
        this.image5.src = "./images/personaje5.png"
        this.image6 = new Image()
        this.image6.src = "./images/personaje6.png"
        this.personaje = this.image1
    }

    animate(){
        if(time % 5 === 0){
            if(this.personaje === this.image1) this.personaje = this.image2
            else if(this.personaje === this.image2) this.personaje = this.image3
            else if(this.personaje === this.image3) this.personaje = this.image4
            else if(this.personaje === this.image4) this.personaje = this.image5
            else if(this.personaje === this.image5) this.personaje = this.image6
            else if(this.personaje === this.image6) this.personaje = this.image1
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
          this.animate ()
          ctx.drawImage(this.personaje, this.x, this.y,this.width, this.height)
    }

    goRight(){
        this.x+=180
      }
      goLeft(){
        this.x-=180
      } 
} 

class Audiencia{
    constructor(){
        this.x = 0
        this.y = 350
        this.width = 900
        this.height = 90
        this.image1 = new Image()
        this.image1.src = "./images/audiencia1.png"
        this.image2 = new Image()
        this.image2.src = "./images/audiencia2.png"
        this.audiencia = this.image1
    }

    animate(){
        if(time % 20 === 0){
            if(this.audiencia === this.image1) this.audiencia = this.image2
            else if(this.audiencia === this.image2) this.audiencia = this.image1
            else if(this.audiencia === this.image1) this.audiencia = this.image2
        }
    }

    draw(){
        this.animate()
        ctx.drawImage(this.audiencia,this.x,this.y,this.width,this.height)
    }
}

class LeftLight{
    constructor(){
        this.x = 50
        this.y = 0
        this.width = 323
        this.height = 227
        this.image1 = new Image()
        this.image1.src = "./images/lightleft1.png"
        this.image2 = new Image()
        this.image2.src = "./images/lightleft2.png"
        this.image3 = new Image()
        this.image3.src = "./images/lightleft3.png"
        this.leftlight = this.image1
    }

    animate(){
        if(time % 20 === 0){
            if(this.leftlight === this.image1) this.leftlight = this.image2
            else if(this.leftlight === this.image2) this.leftlight = this.image3
            else if(this.leftlight === this.image3) this.leftlight = this.image1
        }
    }

    draw(){
        this.animate()
        ctx.drawImage(this.leftlight,this.x,this.y,this.width,this.height)
    }
}

class RightLight{
    constructor(){
        this.x = 527
        this.y = 0
        this.width = 323
        this.height = 227
        this.image1 = new Image()
        this.image1.src = "./images/lightright1.png"
        this.image2 = new Image()
        this.image2.src = "./images/lightright2.png"
        this.image3 = new Image()
        this.image3.src = "./images/lightright3.png"
        this.rightlight = this.image1
    }

    animate(){
        if(time % 20 === 0){
            if(this.rightlight === this.image1) this.rightlight = this.image2
            else if(this.rightlight === this.image2) this.rightlight = this.image3
            else if(this.rightlight === this.image3) this.rightlight = this.image1
        }
    }

    draw(){
        this.animate()
        ctx.drawImage(this.rightlight,this.x,this.y,this.width,this.height)
    }
}

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
  
class Tomates{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.tipo = tipo
        this.width = 30
        this.height = 32
        this.image = new Image()
        this.image.src = images.tomate
        this.image.onload = () => {
            this.draw()
        } 
        this.crash = new Audio()
        this.crash.src = "boo.mp3"
    }

    draw(){
        this.y-=2.5
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Notas{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 80
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

class Botellas{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 80
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
        this.y-=3
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
var audiencia = new Audiencia()
var rightlight = new RightLight()
var leftlight = new LeftLight()


//Funciones Principales
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    personaje.draw()
    audiencia.draw()
    leftlight.draw()
    rightlight.draw()
    drawObstaculos()
    checkCollitions()
    if((time/60)===60) gameOver()
    time++
}

function start(){
    if(interval) return
    if(board.stage1 == true) {
        interval = setInterval(update, 1000/60);
        obstaculosInterval = setInterval(generateObstaculos,4500)
    }
    if(board.stage2 == true) {
        interval = setInterval(update, 1000/60);
        obstaculosInterval = setInterval(generateObstaculos,3500)
    }
    if(board.stage3 == true) {
        interval = setInterval(update, 1000/60);
        obstaculosInterval = setInterval(generateObstaculos,2000)
    }
    if(board.stage4 == true) {
        interval = setInterval(update, 1000/60);
        obstaculosInterval = setInterval(generateObstaculos,1500)
    }
    
}

function gameOver(){
        frames=0
        clearInterval(interval)
        clearInterval(obstaculosInterval)
        interval = null
        higherScore()
        board.smoke.pause()
        board.back.pause()
        board.fuel.pause()
        board.chona.pause()
}

//Auxiliares
function generateObstaculos(){
    if(frames % 100 === 0){
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
                score-=5
            } 
            if(obstaculo.tipo=="Botella"){
                score-=10
            }
            if(obstaculo.tipo=="Nota"){
                score+=10
            }
        }
    })
}


function higherScore (){
    if (score === score2){
        ctx.font = "700 60px Arial"
        ctx.fillText("Tie", 310,280)
        ctx.fillText("♫: " + score, 370,350)
    } else if (score > score2){
        ctx.font = "700 60px Arial"
        ctx.fillText("You Rock!!", 310,280)
        ctx.fillText("♫: " + score, 370,350)
    } else {
        ctx.font = "700 60px Arial"
        ctx.fillText("You Suck!!", 310,280)
        ctx.fillText("♫: " + score, 370,350)
    }
}

//Observadores
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
        case 27:
        if(e.keyCode === 27){
            start()
           }
     }

  }




 




 
 


  




 

