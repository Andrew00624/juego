
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
var obstaculosInterval2
var frames2 = 0;
var time2 = 0;
var images2 = {
    bg2:"./images/stage2.jpg",
    personaje2:"./images/guitarist2.png",
    tomate2: "./images/tomato2.png",
    botella2:"./images/bottle.png",
    nota2: "./images/note2.png"

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
        ctx2.fillText("Time: " + Math.floor(time2 / 60),730,60)       
        }

       

} //clase Board

class Personaje2{
    constructor(){
        this.x = 360
        this.y = 30
        this.width = 170
        this.height = 240
        this.image7 = new Image()
        this.image7.src = "./images/personaje1-2.png"
        this.image8 = new Image()
        this.image8.src = "./images/personaje2-2.png"
        this.image9 = new Image()
        this.image9.src = "./images/personaje3-2.png"
        this.image10 = new Image()
        this.image10.src = "./images/personaje4-2.png"
        this.image11 = new Image()
        this.image11.src = "./images/personaje5-2.png"
        this.image12= new Image()
        this.image12.src = "./images/personaje6-2.png"
        this.personaje2 = this.image7
    }

    animate(){
        if(time % 5 === 0){
            if(this.personaje2 === this.image7) this.personaje2 = this.image8
            else if(this.personaje2 === this.image8) this.personaje2 = this.image9
            else if(this.personaje2 === this.image9) this.personaje2 = this.image10
            else if(this.personaje2 === this.image10) this.personaje2 = this.image11
            else if(this.personaje2 === this.image11) this.personaje2 = this.image12
            else if(this.personaje2 === this.image12) this.personaje2 = this.image7
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
        this.animate ()
          ctx2.drawImage(this.personaje2, this.x, this.y,this.width, this.height)
    }

    goRight2(){
        this.x+=180
      }
      goLeft2(){
        this.x-=180
      }

} // clase Personaje 1 


// clase Audiencia
class Audiencia2{
    constructor(){
        this.x = 0
        this.y = 350
        this.width = 900
        this.height = 90
        this.image3 = new Image()
        this.image3.src = "./images/audiencia1-2.png"
        this.image4 = new Image()
        this.image4.src = "./images/audiencia2-2.png"
        this.audiencia2 = this.image3
    }

    animate(){
        if(time % 20 === 0){
            if(this.audiencia2 === this.image3) this.audiencia2 = this.image4
            else if(this.audiencia2 === this.image4) this.audiencia2 = this.image3
            else if(this.audiencia2 === this.image3) this.audiencia2 = this.image4
        }
    }

    draw(){
        this.animate()
        ctx2.drawImage(this.audiencia2,this.x,this.y,this.width,this.height)
    }
}

// clase Lights
class LeftLight2{
    constructor(){
        this.x = 50
        this.y = 0
        this.width = 323
        this.height = 227
        this.image4 = new Image()
        this.image4.src = "./images/lightleft4.png"
        this.image5 = new Image()
        this.image5.src = "./images/lightleft6.png"
        this.image6 = new Image()
        this.image6.src = "./images/lightleft5.png"
        this.leftlight2 = this.image4
    }

    animate(){
        if(time % 20 === 0){
            if(this.leftlight2 === this.image4) this.leftlight2 = this.image5
            else if(this.leftlight2 === this.image5) this.leftlight2 = this.image6
            else if(this.leftlight2 === this.image6) this.leftlight2 = this.image4
        }
    }

    draw(){
        this.animate()
        ctx2.drawImage(this.leftlight2,this.x,this.y,this.width,this.height)
    }
}

// clase Right Light
class RightLight2{
    constructor(){
        this.x = 527
        this.y = 0
        this.width = 323
        this.height = 227
        this.image4 = new Image()
        this.image4.src = "./images/lightright4.png"
        this.image5 = new Image()
        this.image5.src = "./images/lightright5.png"
        this.image6 = new Image()
        this.image6.src = "./images/lightright6.png"
        this.rightlight2 = this.image4
    }

    animate(){
        if(time % 20 === 0){
            if(this.rightlight2 === this.image4) this.rightlight2 = this.image5
            else if(this.rightlight2 === this.image5) this.rightlight2 = this.image6
            else if(this.rightlight2 === this.image6) this.rightlight2 = this.image4
        }
    }

    draw(){
        this.animate()
        ctx2.drawImage(this.rightlight2,this.x,this.y,this.width,this.height)
    }
}

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
        this.height = 32
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
        this.height = 80
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
        this.y-=1.5
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

// Clase Botellas 
class Botellas2{
    constructor(x,tipo){
        this.x = x 
        this.y = 400 
        this.width = 30
        this.height = 80
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
        this.y-=2.5
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
var audiencia2 = new Audiencia2()
var rightlight2 = new RightLight2()
var leftlight2 = new LeftLight2()


//Funciones principales
function update2(){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height)
    board2.draw()
    personaje2.draw()
    audiencia2.draw()
    rightlight2.draw()
    leftlight2.draw()
    drawObstaculos2()
    checkCollitions2()
    if((time2/60)===60)gameOver2()
    time2++
    //frames2++
}

function start2(){
    if(interval2) return
    if(board2.stage1 == true) {
        interval2 = setInterval(update2, 1000/60);
        obstaculosInterval2 = setInterval(generateObstaculos2,4500)
    }
    if(board2.stage2 == true) {
        interval2 = setInterval(update2, 1000/60);
        obstaculosInterval2 = setInterval(generateObstaculos2,3500)
    }
    if(board2.stage3 == true) {
        interval2 = setInterval(update2, 1000/60);
        obstaculosInterval2 = setInterval(generateObstaculos2,2000)
    }
    if(board2.stage4 == true) {
        interval2 = setInterval(update2, 1000/60);
        obstaculosInterval2 = setInterval(generateObstaculos2,1500)
    }
}


function gameOver2(){
    clearInterval(interval2)
    higherScore2()
    clearInterval(obstaculosInterval2)
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
                score2-=5
            } 
            if(obstaculo2.tipo=="Botella"){
                score2-=10
            }
            if(obstaculo2.tipo=="Nota"){
                score2+=10
            }
        }
    })
}

function higherScore2(){
    if (score === score2){
        ctx2.font = "60px Avenir"
        ctx2.fillText("You Both Rock or Suck", 50,250)
        ctx2.fillText("♫: " + score2, 50,350)
    } else if (score2 > score){
        ctx2.font = "60px Avenir"
        ctx2.fillText("You Rock!!", 50,250)
        ctx2.fillText("♫: " + score2, 50,350)
    } else {
        ctx2.font = "60px Avenir"
        ctx2.fillText("You Suck!!", 50,250)
        ctx2.fillText("♫: " + score2, 50,350)
    }
}

//los observadores




 




 
 


  




 

