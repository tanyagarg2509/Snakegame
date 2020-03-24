var mySound;
function init()
{
	canvas = document.getElementById('mycanvas');
	W= canvas.width=window.innerWidth;//width
	H=canvas.height=window.innerHeight;//height
	pen=canvas.getContext('2d');//to draw rect
	cs=30;//cellsize
	game_over=false;
	pen.fillStyle = "blue";//color
	score=0;
	lastX=Math.round(W/cs);//last x of canvas
	lastY=Math.round(H/cs);//last y of canvas
	

	// images of food
	food_img=new Image();
	// food_img.src="Assets/banana.png";
	
	food_img.src="Assets/banana.png";


	trophy = new Image();
	trophy.src="Assets/trophy1.png";

	food=getRandomFood();
	snake={
		init_len:5,
		cells:[],
		color:"red",
		direction:"right",
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},
		updateSnake:function()
		{
			mySound.play();
			// mySound.loadme();
			var headx= this.cells[0].x;
			var heady=this.cells[0].y;

			//for snake biting itselef
			for(var i=3;i<this.cells.length;i++){
				
				if((headx/cs+1==this.cells[i].x && heady/cs==this.cells[i].y ) || 
				(headx/cs==this.cells[i].x+1 && heady/cs==this.cells[i].y )||
				 (heady/cs==this.cells[i].y+1 && headx/cs==this.cells[i].x ) ||
				 (heady/cs +1==this.cells[i].y && headx/cs==this.cells[i].x))
				{
					// game_over==true;
					mySound.stop();
					clearInterval(f);
					alert("game over");
				}
			}

			//if food eaten by snake
			if(headx==food.x && heady==food.y){
				// console.log("over");
				score+=1;
				img_arr=['Assets/apple.png','Assets/banana.png','Assets/papaya.png'];
				var k=Math.floor((Math.random() *3));
				// console.log(img_arr[k]);
				food_img.src=img_arr[k];
				food=getRandomFood(); 

				//for food items to not generate on snake
				for(var i=0;i<this.cells.length;i++){
					if(food.x==this.cells[i].x || food.y==this.cells[i].y){
						food=getRandomFood(); 
					}
				}
				//check for food do not generate on snake itself
			}
			else{
				this.cells.pop();
			}
			
			var nextX,nextY;
			if(this.direction=="right"){
				nextX=headx+1;
				nextY=heady;
			}
			else if(this.direction=="left"){
				nextX=headx-1;
				nextY=heady;
			}
			else if(this.direction=="up"){
				nextX=headx;
				nextY=heady-1;
			}
			else if(this.direction=="down"){
				nextX=headx;
				nextY=heady+1;
			}
			//game over when boundaries touched
			if(this.cells[0].x<0 || this.cells[0].y <0 || this.cells[0].x>lastX-2|| this.cells[0].y>lastY-2 ){
					game_over=true;
			}
			this.cells.unshift({x:nextX,y:nextY});
		}
	};// end of snake object

	snake.createSnake();
	function keyPressed(e){
		// console.log("key pressed is :"+e.key);
		if(e.key=="ArrowRight"){
			if(snake.direction=="down" || snake.direction=="up" )
				snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			if(snake.direction=="down" || snake.direction=="up" )
			snake.direction="left";
		}
		else if(e.key=="ArrowUp"){
			if(snake.direction=="right" || snake.direction=="left" )
			snake.direction="up";
		}
		else if(e.key=="ArrowDown"){
			if(snake.direction=="right" || snake.direction=="left" )
			snake.direction="down";
		}
	}
	// add eventlistener
	document.addEventListener('keydown',keyPressed);

	
}//end of init

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	// draw food
	pen.fillStyle=food.color;

	// pen.fillRect(food.x*cs,food.y*cs,cs-2,cs-2);
	
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,1,8,100,100);
	pen.fillStyle="purple";
	pen.font="20px Roboto"
	pen.fillText(score,50,50);
}

function update(){
	// mySound.loadme();
	snake.updateSnake();
	
}

function getRandomFood(){

	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	if(foodX==lastX-1|| foodX==0 || foodY==lastY-1|| foodY==0 ||foodX==1&&foodY==8){
		var foodX=Math.round(Math.random()*(W-cs)/cs);
		var foodY=Math.round(Math.random()*(H-cs)/cs);
	}
	var food={
		x:foodX,
		y:foodY,
		color:"blue",
	}
	return food;
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    // this.sound.setAttribute("loop", "true");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    } 
    this.loadme=function(){
    	this.sound.load();
    }  
    this.ontimeupdate = function() {
     return this.sound.currentTime;
	} 
}

function gameloop(){
	if(game_over==true){
		mySound.stop();
		clearInterval(f);

		alert("Game Over");
		return;
	}
	draw();
	update();

	//for reloading audio
	var time=mySound.ontimeupdate();
	// console.log(time);
	if(time>=30){
		mySound.loadme();
	}
}
window.onload = function() {
mySound = new sound("Assets/theme.mp3");
mySound.play();
   
}

init();
var f=setInterval(gameloop,120); 

// if(headx<1){
// 	snake.direction="right";
// 	// console.log("left");
// }
// if(headx>lastX){
// 	snake.direction="left";
// 	// console.log("right"+last);
// }
// if(heady<1){
// 	snake.direction="down";
// }
// if(heady>lastY){
// 	snake.direction="up";
// }