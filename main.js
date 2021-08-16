status = "";
input = "";

function setup() {
    canvas = createCanvas(300, 300);
    canvas.position(635, 400);
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
}

function draw() {
    image(video, 0, 0, 300, 300);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
    input = document.getElementById("input_object").nodeValue;
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}