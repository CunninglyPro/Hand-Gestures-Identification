Webcam.set({
    width: 300,
    height: 300,
    format: 'jpeg',
    jpeg_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {

    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });

}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CaSmLCc3z/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model is Loaded!");
}

var predicted_emoji = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data = predicted_emoji;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        
        if (results[0].label == "amazing") {
            document.getElementById("result_gesture_name").innerHTML = "👌 - This look is amazing!";
            predicted_emoji = "This look is amazing";
            speak();
        } else if (results[0].label == "best") {
            document.getElementById("result_gesture_name").innerHTML = "👍 - All the best!";
            predicted_emoji = "All the best";
            speak();
        } else if (results[0].label == "victory") {
            document.getElementById("result_gesture_name").innerHTML = "✌ - That was a marvelous victory.";
            predicted_emoji = "That was a marvelous victory";
            speak();
        }
    }
}