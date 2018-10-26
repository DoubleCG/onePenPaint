class NodesLink{
	constructor(){
		let length = 0;
		this.link = [];
	}

	push(node){
		node.index = length;
		this.link[length] = node;
		length++;
	}

	getLink(){
		return this.link;
	}

	getHead(){
		return this.link[length-1];
	}

	fadeSubs(index){
		for(let i=index+1;i<length;i++){
			subDefault(this.link[i]);
		}
		length = index+1;
	}

	getLength(){
		return length;
	}
}



let unit = 55;

let height = 6;
let width = 6;


let findSpeed = 10;

let start = {
	x:1,
	y:0
};

let lack = [
	{
		x:1,
		y:1
	},
	{
		x:4,
		y:3
	},
	{
		x:3,
		y:1
	}
];

let nodeMap = [];
let records = [];

function makeRecord(){
	let record = [];
	let link = nodesLink.getLink();
	for(let i=0,l=nodesLink.getLength();i<l;i++){
		record.push({
			x:link[i].x,
			y:link[i].y
		})
	}
	records.push(record);
	console.log(records);
}


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




let nodesLink = new NodesLink();
let container = document.querySelector(".container");
for(let i=0;i<height;i++){
	for(let j=0;j<width;j++){
		let sub = document.createElement('div');
		sub.style.top = i * unit + 'px';
		sub.style.left = j * unit + 'px';
		sub.y = i;
		sub.x = j;
		if(!nodeMap[i]){
			nodeMap[i] = [];
		}
		if(i==start.y&&j==start.x){
			subAction(sub);
			nodesLink.push(sub);
			sub.onmouseover = function(){
				nodesLink.fadeSubs(0);
			}
		}else if(!isLack(sub)){
			subDefault(sub);
			subFactory(sub);
			nodeMap[i][j] = sub;
		}

		container.appendChild(sub);
	}
}


function subFactory(node){
	node.onmouseover = function(){
		nodeOver(node);
	}
	node.onmouseout = function(){
		nodeOut(node);
	}
}

function nodeOver(node){
	if(node.index){
		nodesLink.fadeSubs(node.index);
	}else{
		if(isCurrentNeighbor(node)){
			subAction(node);
		}
	}
}

function nodeOut(node){
	if(isCurrentNeighbor(node)){
		nodesLink.push(node);
		if(winNumber === nodesLink.getLength()){
			makeRecord();
		}
	}else{
		if(node.index != nodesLink.getLength()-1){
			subDefault(node);
		}
	}
}

function makeCurrent(node){
	nodeOver(node);
	nodeOut(node);
}



function subAction(node){
	node.className = 'sub active';
}

function subDefault(node){
	node.className = 'sub default';
	node.index = null;
	node.hadUp = false;
	node.hadRight = false;
	node.hadDown = false;
	node.hadLeft = false;
}


function isCurrentNeighbor(node){
	let currentNode = nodesLink.getHead();
	if(currentNode.x == node.x){
		if(Math.abs(currentNode.y - node.y) == 1){
			return true;
		}
	}else if(currentNode.y == node.y){
		if(Math.abs(currentNode.x - node.x) == 1){
			return true;
		}
	}else{
		return false;
	}
}

console.time("A");
findWinWay(0);
console.timeEnd("A");

function findWinWay(index){
	let currentNode = nodesLink.getHead();
	if(!currentNode) return;

	let upNode = null,
		rightNode = null,
		downNode = null,
		leftNode = null;

	if(nodeMap[currentNode.y]){
		leftNode = nodeMap[currentNode.y][currentNode.x-1];
		rightNode = nodeMap[currentNode.y][currentNode.x+1];
	}

	if(nodeMap[currentNode.y-1]){
		upNode = nodeMap[currentNode.y-1][currentNode.x]
	}

	if(nodeMap[currentNode.y+1]){
		downNode = nodeMap[currentNode.y+1][currentNode.x]
	}

	if( !( upNode && !upNode.index ) &&
		!( rightNode && !rightNode.index ) &&
		!( downNode && !downNode.index ) &&
		!( leftNode && !leftNode.index ) )
	{
		nodesLink.fadeSubs(index-1);
		return findWinWay(nodesLink.getLength()-1);
	}else{
		if(!currentNode.hadUp && upNode && !upNode.index)
		{
			currentNode.hadUp = true;
			makeCurrent(upNode);
			return findWinWay(index+1);
		}
		else if(!currentNode.hadRight && rightNode && !rightNode.index){
			currentNode.hadRight = true;
			makeCurrent(rightNode);
			return findWinWay(index+1);
		}
		else if(!currentNode.hadDown && downNode && !downNode.index )
		{
			currentNode.hadDown = true;
			makeCurrent(downNode);
			return findWinWay(index+1);
		}
		else if(!currentNode.hadLeft && leftNode && !leftNode.index )
		{
			currentNode.hadLeft = true;
			makeCurrent(leftNode);
			return findWinWay(index+1);
		}
		else
		{
			nodesLink.fadeSubs(index-1);
			return findWinWay(index-1);
		}
	}
}