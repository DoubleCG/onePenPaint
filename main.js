let link = [];

let height = 3;
let width = 3;

let start = {
	x:1,
	y:0
};

let lack = [
	{
		x:0,
		y:0
	}
];

let nodeMap = [];

function isLack(node){
	let _y = node.y, _x = node.x;
	for(let item of lack){
		if(item.x == _x  && item.y == _y){
			return true;
		}
	}
	return false;
}


let winNumber = height * width - lack.length;

for(let i=0;i<height;i++){
	for(let j=0;j<width;j++){
		let node = {
			y:i,
			x:j
		};
		if(!nodeMap[i]){
			nodeMap[i] = [];
		}
		if(i==start.y&&j==start.x){
			link.push(node);
		}else if(!isLack(node)){
			fade(node);
			nodeMap[i][j] = node;
		}
	}
}


function isWin(){
	return winNumber === link.length;
}

function makeHead(node){
	fade(link.pop());
	link.pop().in = false;
	node.in = true;
	link.push(node);
}

function fade(node){
	node.in = false;
	node.hadUp = false;
	node.hadRight = false;
	node.hadDown = false;
	node.hadLeft = false;
}

console.time("A");
findWinWay(0);
console.timeEnd("A");

function findWinWay(index){
	if(isWin()) return link;

	let head = link[link.length-1];
	
	let upNode = null, rightNode = null, downNode = null, leftNode = null;

	if(nodeMap[head.y-1]){
		upNode = nodeMap[head.y-1][head.x];
	}
	if(nodeMap[head.y+1]){
		downNode = nodeMap[head.y+1][head.x]
	}
	if(nodeMap[head.y]){
		leftNode = nodeMap[head.y][head.x-1];
		rightNode = nodeMap[head.y][head.x+1];
	}


	if(!head.hadUp && upNode && !upNode.in)
	{
		head.hadUp = true;
		makeHead(upNode);
	}
	else if(!head.hadRight && rightNode && !rightNode.in){
		head.hadRight = true;
		makeHead(rightNode);
	}
	else if(!head.hadDown && downNode && !downNode.in )
	{
		head.hadDown = true;
		makeHead(downNode);
	}
	else if(!head.hadLeft && leftNode && !leftNode.in )
	{
		head.hadLeft = true;
		makeHead(leftNode);
	}
	else
	{
		return findWinWay(index-1);
	}

	return findWinWay(index+1);
}