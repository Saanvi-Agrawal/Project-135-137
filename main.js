status="";
objects=[];

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects!";
    object_name=document.getElementById("objectname").value;
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name+" found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+" found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById("object_status").innerHTML=object_name+" not found!"
            }
        }
    }
}



function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;

}