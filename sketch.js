var POPULATION = 200;
var flock = [];


var sprites = [];
var spritesNum = 0;

var quadTree;
var points;
var count = 0;

var perception = 35;
var separationSlider, cohesionSlider, alignmentSlider, mousePower;

var resizedWidth = 1500;
var resizedHeight = 800;

function setup() {
  let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
  canvas.parent("canvascontainer");

  sprites[0] = 0;
  
  sprites[1] = SailBoat;
  sprites[2] = AntSprite;

  

  // Generate Boids
  for (let i = 0; i < POPULATION; i++) {
    flock.push(new Boid());
  }

  CreateSliders();

  ShowQTreeButton = select("#ShowQTreeButton");
  ShowQTreeBool = select("#ShowQTreeBool");
  ToggleSettingsButton = select("#ToggleSettingsButton");

  ShowPerceptionButton = select("#ShowPerception");
  ShowPerceptionBool = select("#ShowPerceptionBool");

  ToggleSettingsButton.mousePressed(ToggleSettings);
  ShowQTreeButton.mousePressed(toggleQuadTree);
  ShowPerceptionButton.mousePressed(toggleShowPerception);

  ToggleSettings();
}

function draw() {
  background(51, 200);

  let boundary = new Rectangle(width / 2, height / 2, width - 1, height - 1);
  quadTree = new QuadTree(boundary, 10);

  for (let boid of flock) {
    let point = new Point(boid.pos.x, boid.pos.y, boid);
    quadTree.insert(point);
  }
  if (showQuadTree) {
    quadTree.show();
  }

  spritesNum = changeImage.value();
  for (let boid of flock) {
    let range = new Circle(boid.pos.x, boid.pos.y, boid.perceptionRadius);
    let points = quadTree.query(range);
    let newFlock = [];
    for (let point of points) {
      newFlock.push(point.userData);
    }

    boid.edges();
    boid.flock(newFlock);
    boid.update();
    boid.show(showPerception);
  }

  quadTree.clear();
  count = 0;

  
  UpdateStats();
  checkBoidPOP();
  
  canvas.style.width = "100%";
  canvas.style.height = "auto";
}

function checkBoidPOP() {
  if (NumBoidsSlider.value() !== POPULATION) {
    let diff = NumBoidsSlider.value() - POPULATION;
    let magDiff = Math.abs(diff);
    if (diff < 0) {
      for (let i = flock.length - 1; i > NumBoidsSlider.value() + magDiff / 5; i--) {
        flock.splice(i, 1);
      }
    } else {
      for (let i = 0; i < magDiff / 5; i++) {
        flock.push(new Boid());
      }
    }
    if (NumBoidsSlider.value() == 0) {
      flock = [];
    }
    POPULATION = flock.length;
  }
}


