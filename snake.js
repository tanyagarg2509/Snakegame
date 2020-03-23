function init(){
	canvas = document.getElementById('mycanvas');
	W= canvas.width=500;
	H=canvas.height=500;
	pen=canvas.getContext('2d');
	cs=30;
	pen.fillStyle = "blue";
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
		updateSnake:function(){
			var headx= this.cells[0].x;
			var heady=this.cells[0].y;

			if(headx==food.x && heady==food.y){
				console.log("over");
				food=getRandomFood();
			}
			else{
				this.cells.pop();
			}


			// if(head){
			// 	snake.direction="left";
			// }
			if(headx<0){
				snake.direction="right";
			}
			else if(W==headx+(cs-2)){
				snake.direction="left";
			}
			// this.cells.pop();
			// console.log(heady,headx);
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
			// var X=headx+1;
			// var Y=heady;
			this.cells.unshift({x:nextX,y:nextY});
		}
	};

	snake.createSnake();
	function keyPressed(e){
		// console.log("key pressed is :"+e.key);
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowUp"){
			snake.direction="up";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
	}
	// add eventlistener
	document.addEventListener('keydown',keyPressed);

	
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle=food.color;
	pen.fillRect(food.x*cs,food.y*cs,cs,cs);
}
function update(){
	snake.updateSnake();
	
}
function getRandomFood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"blue",
	}
	return food;
}
function gameloop(){
	draw();
	update();
}
init();
var f=setInterval(gameloop,100);
