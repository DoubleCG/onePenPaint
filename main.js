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

let height = 5;
let width = 5;


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
		if(isHeadNeighbor(node)){
			subAction(node);
		}
	}
}

function nodeOut(node){
	if(isHeadNeighbor(node)){
		nodesLink.push(node);
		if(isWin()){
			makeRecord();
		}
	}else{
		if(node.index != nodesLink.getLength()-1){
			subDefault(node);
		}
	}
}

function isWin(){
	return winNumber === nodesLink.getLength()
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


function isHeadNeighbor(node){
	let head = nodesLink.getHead();
	if(head.x == node.x){
		if(Math.abs(head.y - node.y) == 1){
			return true;
		}
	}else if(head.y == node.y){
		if(Math.abs(head.x - node.x) == 1){
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
	let head = nodesLink.getHead();
	if(isWin()) return;

	let upNode = null,
		rightNode = null,
		downNode = null,
		leftNode = null;

	if(nodeMap[head.y]){
		leftNode = nodeMap[head.y][head.x-1];
		rightNode = nodeMap[head.y][head.x+1];
	}

	if(nodeMap[head.y-1]){
		upNode = nodeMap[head.y-1][head.x]
	}

	if(nodeMap[head.y+1]){
		downNode = nodeMap[head.y+1][head.x]
	}


	if(!head.hadUp && upNode && !upNode.index)
	{
		head.hadUp = true;
		makeCurrent(upNode);
	}
	else if(!head.hadRight && rightNode && !rightNode.index){
		head.hadRight = true;
		makeCurrent(rightNode);
	}
	else if(!head.hadDown && downNode && !downNode.index )
	{
		head.hadDown = true;
		makeCurrent(downNode);
	}
	else if(!head.hadLeft && leftNode && !leftNode.index )
	{
		head.hadLeft = true;
		makeCurrent(leftNode);
	}
	else
	{
		nodesLink.fadeSubs(index-1);
		return findWinWay(index-1);
	}

	return findWinWay(index+1);
}