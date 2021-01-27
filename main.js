Webcam.set({
    height: 300,
    width: 350,
    image_format: "jpeg",
    jpeg_quality: 90
});
Camera = document.getElementById("Camera");
Webcam.attach("#Camera");


function Capture_Img() {
    Webcam.snap(function (data_uri) {
        document.getElementById("Result").innerHTML = '<img id = "Snapshot" src = "' + data_uri + '"/>';
    });
}
console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7nAXDlCLp/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function Speak() {
    var Synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.Speak(UtterThis);
}

function Identify_Img() {
    Img = document.getElementById("Snapshot");
    classifier.classify(Img, getResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("Emoji_Answer1").innerHTML = results[0].label;
        document.getElementById("Emoji_Answer2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        Speak();
        if(results[0].label == "happy"){
            document.getElementById("Emoji_Img").innerHTML = "&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("Emoji_Img").innerHTML = "&#128532";
        }
        if(results[0].label == "angry"){
            document.getElementById("Emoji_Img").innerHTML = "&#128548";
        }
        if(results[1].label == "happy"){
            document.getElementById("Emoji_Img").innerHTML = "&#128522";
        }
        if(results[1].label == "sad"){
            document.getElementById("Emoji_Img").innerHTML = "&#128532";
        }
        if(results[1].label == "angry"){
            document.getElementById("Emoji_Img").innerHTML = "&#128548";
        }
    }
}
