var canvasResized = false;


var sepBoost = false;
var arriveAtMouse = false;
var showQuadTree = false;
var showPerception = false;
var rainbow = false;

function preload() {
  AntSprite = loadImage("Ant.png");
  SailBoat = loadImage("Sailboat.png");

  Settings = document.getElementById("settings");

  // Shown to the left of the sliders
  SepStat = select("#SepStat");
  CohStat = select("#CohStat");
  AliStat = select("#AliStat");
  NumBoidsStat = select("#NumBoidsStat");
  MousePowerStat = select("#MousePowerStat");
  BoidImage = select("#Image");
  PerceptionStat = select("#PerceptionRadiusStat")

  mouseStat = select("#mouseStat");
  mouseStatDisplay = document.getElementById("controls");
  SettingsButton = document.getElementById("ToggleSettingsButton");
}


function CreateSliders() {
  separationSlider = createSlider(0, 10, 1, 0.1);
  separationSlider.parent("SepSlider");
  cohesionSlider = createSlider(0, 10, 0.4, 0.1);
  cohesionSlider.parent("CohSlider");
  alignmentSlider = createSlider(0, 10, 1.1, 0.1);
  alignmentSlider.parent("AliSlider");
  mousePowerSlider = createSlider(0, 1000, 100, 25);
  mousePowerSlider.parent("MouseSlider");

  NumBoidsSlider = createSlider(0, 1000, POPULATION, 25);
  NumBoidsSlider.parent("NumBoids");

  changeImage = createSlider(0, sprites.length-1, 0, 1);
  changeImage.parent("changeImageSlider");
  PerceptionRadiusSlider = createSlider(0, 200, 35, 1);
  PerceptionRadiusSlider.parent("PerceptionRadiusSlider");
}
function UpdateStats() {
  if (settings.style.display !== "none") {
    SepStat.html(separationSlider.value());
    CohStat.html(cohesionSlider.value());
    AliStat.html(alignmentSlider.value());
    NumBoidsStat.html(NumBoidsSlider.value());
    MousePowerStat.html(mousePowerSlider.value());
    PerceptionStat.html(PerceptionRadiusSlider.value());


    ShowQTreeBool.html(showQuadTree);
    ShowPerceptionBool.html(showPerception);
    if (localServer) {
      if (spritesNum == 0) {
        BoidImage.html("BOID");
      } else if (spritesNum == 1){
        BoidImage.html("Sailboat");
      } else if (spritesNum == 2){
        BoidImage.html("ANT");
      }
    }
  }
  
  // Change the status in the bottom left
  if (arriveAtMouse) {
    mouseStat.html("Attract");
  } else {
    mouseStat.html("Repel");
  }
  
  perception = PerceptionRadiusSlider.value();
}

function ToggleDisplay(display) {
  if (display.style.display != "none") {
    display.style.display = "none";
  } else {
    display.style.display = "revert";
  }
}
function ToggleSettings() {
  ToggleDisplay(Settings);
}


function centerCanvas(text) {
  if (canvasResized) {
    document.getElementById(text).classList.add("resized");
    document.getElementById("settings").classList.add("settingsResized");
  } else {
    document.getElementById(text).classList.remove("resized");
    document.getElementById("settings").classList.remove("settingsResized");
  }
}

function keyPressed() {
  if (key == "R") {
    rainbow = !rainbow;
  }
  if (key == "G") {
    sepBoost = !sepBoost;
  }
  if (key == "P") {
    showPerception = !showPerception;
  }
  if (key == "A") {
    arriveAtMouse = !arriveAtMouse;
  }
  if (key == " ") {
    ToggleDisplay(mouseStatDisplay);
    ToggleDisplay(SettingsButton);
  }
  if (key == "S") {
    ToggleDisplay(Settings);
  }

  if (key == 'T') {
    canvasResized = !canvasResized;
    if (canvasResized) {
      resizeCanvas(resizedWidth, resizedHeight);
    } else {
      resizeCanvas(windowWidth-20, windowHeight-20);
      
    }
    centerCanvas("canvascontainer");
  }
}

function toggleQuadTree() {
  showQuadTree = !showQuadTree;
}
function toggleShowPerception() {
  showPerception = !showPerception;
}
