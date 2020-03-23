function init(){
	canvas = document.getElementById('mycanvas');
	W= canvas.width=500;
	H=canvas.height=500;
	pen=canvas.getContext('2d');
	cs=60;
	pen.fillStyle = "blue";

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
			this.cells.pop();
	
			headx= this.cells[0].x;
			heady=this.cells[0].y;
			var X=headx+1;
			var Y=heady;
			this.cells.unshift({x:X,y:Y});
		}
	};
	snake.createSnake();
}

function draw(){
	// pen.clearRect(0,0,W,H);

	snake.drawSnake();
}
function update(){
	snake.updateSnake();
	
}

function gameloop(){
	draw();
	update();
}
init();
var f=setInterval(gameloop,100);
