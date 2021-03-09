var tree = [];
var leaves = [];
var count = 0;
let bg;
var font;
var vehicles = [];
let song;
var maxbranch = 256;

function preload(){
  font = loadFont('GRUNGE.TTF');
  soundFormats('mp3');
  song = loadSound('assests/sorry');
}

 function setup() {
  createCanvas(1050,450);
  bg = loadImage('flower.jpg');
    var points = font.textToPoints('BLOSSOM', 10, 200, 100);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  root = new Branch(a, b); 

  tree[0] = root;
}

function mousePressed(){
  if (tree.length < maxbranch) {
  for (var i = tree.length - 1; i>=0; i--){
    if (!tree[i].finished){
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;

  }
  count++;

    if (count === 8) {
          if (song.isPlaying()) {
           song.stop();
          } else {
         song.play();
    }
      for (var i = 0; i < tree.length; i++) {
       if (!tree[i].finished) {
           var leaf = tree[i].end.copy();
           leaves.push(leaf);
        }
      }
  }
}
}

function keyPressed() {
  if (key === " ") {
   if (song.isPlaying()) {
    song.stop();
    count = 7
  } else {
    song.play();
  }

}
}
 
function draw() {
  background(bg); 
  //background(0);
  
  for (var i = 0; i < tree.length; i++){  
  tree[i].show();
  //tree[i].jitter();
  } 

  for (var i = 0; i < leaves.length; i++) {
      fill(255, 0, 100, 200);
      noStroke();
      ellipse(leaves[i].x, leaves[i].y, 10, 10);
      //leaves[i].y += random(0, 2);
    }

    for (var i = 0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  } 
}

