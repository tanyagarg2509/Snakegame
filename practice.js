function init(){

rect={
x:20,
y:20,
w:40,
h:40,
speed:20,
};

console.log('in init');

}
function draw(){
	console.log('in draw');
	pen.clearRect(0,0,W,H);
	pen.fillStyle = "blue";
	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
}
function update(){
	// console.log('in update');
	rect.x+=rect.speed;
	if(rect.x>W-rect.w || rect.x <0){
		rect.speed *=-1;
	}

}
function gameloop(){
	draw();
	update();

	if(game_over==true)
	clearInterval(f);
}
init();
var f=setInterval(gameloop,100);

// pen.fillStyle = "blue";
// pen.fillRect(20,20,40,40);

// pen.fillRect(rect.x,rect.y,rect.w,rect.h);





/* Events*/
function f(){
	console.log('in f');
}
function f2(e){
	console.log('in f2'+e.key);
}
document.addEventListener('click',f);
canvas.addEventListener('click',f);

document.addEventListener('keydown',f2);


// for circe
// pen.arc(60,60,50,0,2*Math.PI);
// pen.stroke();
// pen.fill();
// pen.fillStyle='red';


// global-> c=10;
// function scope -> var a=10;
// blockscope -> let c =10;
 // console.log(Math.sqrt(10));


 // function Hoisting
 // var sqrt_n=function(){
 // 	console.log('wohoo');
 // 	return ;
 // }


 // var eggs=['one','two','three'];
 // eggs.forEach(function (ind,val){
 // 	console.log(ind,val);
 // });

 // var bird={
 // 	x:100,
 // 	y:100,
 // 	color:'red',
 // 	fly:function(){
 // 		console.log('BIRD WANTS TO FLY');
 // 	}
 // };
 

