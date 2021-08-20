objects = [];
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
    image(video, 0, 0, 350, 350);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            if (objects[i].label == input) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status: OBJECTS DETECTED";
                var synth = window.speechSynthesis;
                speak_data = objects[i].label;
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
    input = document.getElementById("input_object").value;
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}