// let chapter = require("./chapters/1_10.js"),
// let chapter = require("./chapters/2_9.js"),
let chapter = require("./chapters/3_13.js"),
	{height,width,lacks,start} = chapter,
	winNumber = height * width - lacks.length,
	link = [],
	map = [];

let head = null;
let upNode = null, rightNode = null, downNode = null, leftNode = null;

iniMap();

if(false){
	showMap();
}else{
	console.time("A");
	console.log(findWinWay());
	console.timeEnd("A");
}

function iniMap(){
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			let node = { y:i, x:j };
			if(!map[i]){
				map[i] = [];
			}
			if(!isLack(node)){
				if(i==start.y&&j==start.x){
					node.in = true;
					link.push(node);
				}else{
					fade(node);
				}
				map[i][j] = node;
			}
		}
	}
}

function showMap(){
	let s = "";
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			if(map[i][j]){
				if(map[i][j].isStart){
					s+="o";
				}else{
					s+="#";
				}
			}else{
				s+=" ";
			}
		}
		s+="\n";
	}
	console.log(s);
}

function isLack(node){
	let _y = node.y, _x = node.x;
	for(let item of lacks){
		if(item.x == _x  && item.y == _y){
			return true;
		}
	}
	return false;
}


function makeHead(node){
	node.in = true;
	link.push(node);
}

function fade(node){
	node.in = false;
	node.toUp = false;
	node.toRight = false;
	node.toDown = false;
	node.toLeft = false;
}

function findWinWay(){
	if(winNumber === link.length) return link;

	head = link[link.length-1];

	if(map[head.y-1]){
		upNode = map[head.y-1][head.x];
		if(!head.toUp && upNode && !upNode.in)
		{
			head.toUp = true;
			makeHead(upNode);
			return findWinWay();
		}
	}
	if(map[head.y+1]){
		downNode = map[head.y+1][head.x];
		if(!head.toDown && downNode && !downNode.in )
		{
			head.toDown = true;
			makeHead(downNode);
			return findWinWay();
		}

	}
	if(map[head.y]){
		leftNode = map[head.y][head.x-1];
		if(!head.toLeft && leftNode && !leftNode.in )
		{
			head.toLeft = true;
			makeHead(leftNode);
			return findWinWay();
		}
	}
	if(map[head.y]){
		rightNode = map[head.y][head.x+1];
		if(!head.toRight && rightNode && !rightNode.in){
			head.toRight = true;
			makeHead(rightNode);
			return findWinWay();
		}
	}

	fade(link.pop());
	return findWinWay();
}