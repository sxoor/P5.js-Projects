let col,row;
let size = 40;
let grid = []; 
let current_cell;
let stack = [];

function setup() {
  createCanvas(400, 400);
  
  col = floor(width/size);
  row = floor(height/size);
  frameRate(10);
  
  for(let j=0;j<row;j++){
    for(let i=0;i<col;i++){
      let cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  
  current_cell = grid[0];
}

function draw() {
  background(0);
  
  for(let i=0;i<grid.length;i++){
    grid[i].show();
  }
  
  current_cell.visited = true;
  current_cell.highlight();
  //1
  let next_cell = current_cell.checkNeighbors();
  if(next_cell){
    next_cell.visited = true;
    
    //2
    stack.push(current_cell);
    
    //3
    removeWalls(current_cell,next_cell);
    
    //4
    current_cell = next_cell;
  }else if(stack.length>0){
    current_cell = stack.pop();
  }
}

function index(i,j){
  if(i<0 || j<0 || i>col-1 || j >col-1){
    return -1;
  }
  
  return i + j * col;
}

function Cell(i,j){
  this.i=i;
  this.j=j;
  this.walls = [true, true, true, true]; // top,right,bottom,left
  this.visited = false;
  
  this.highlight = function()
  {
    let x = this.i * size;
    let y = this.j * size;
    fill(255,0,0);
    noStroke();
    rect(x,y,size,size);
  }
  
  this.checkNeighbors = function(){
    let neighbors = [];
    
    let top    =   grid[index(i,j-1)];
    let right  =   grid[index(i+1,j)];
    let bottom =   grid[index(i,j+1)];
    let left   =   grid[index(i-1,j)];
    
    if(top && !top.visited){
      neighbors.push(top);
    }
    if(right && !right.visited){
      neighbors.push(right);
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom);
    }
    if(left && !left.visited){
      neighbors.push(left);
    }
    
    if(neighbors.length>0){
      let random_neighbor = floor(random(0,neighbors.length));
      return neighbors[random_neighbor];
    }else{
      return undefined;
    }
    
  }
  
  this.show = function(){
    let x = this.i * size;
    let y = this.j * size;
    stroke(255);
    
    if(this.walls[0]) line(x,y,x+size,y);
    if(this.walls[1]) line(x+size,y,x+size,y+size);
    if(this.walls[2]) line(x+size,y+size,x,y+size);
    if(this.walls[3]) line(x,y+size,x,y);
    
    if(this.visited){
      fill(255,0,255,100);
      noStroke();
      rect(x,y,size,size);
        if(i ==10 && this.j ==10){
          fill(0,255,0);
          noStroke();
          rect(x,y,size,size);
      }
    }
  }
  
}

function removeWalls(current_cell ,next_cell){
  
  let x = current_cell.i - next_cell.i;
  
  if(x === 1){
    current_cell.walls[3] = false;
    next_cell.walls[1] = false;
    
  }else if (x === -1){
    current_cell.walls[1] = false;
    next_cell.walls[3] = false;
  }
  
  let y = current_cell.j - next_cell.j;
  
  if(y === 1){
    current_cell.walls[0] = false;
    next_cell.walls[2] = false;
    
  }else if (y === -1){
    current_cell.walls[2] = false;
    next_cell.walls[0] = false;
  }
}


