status="";
Img="";
var objects=[];

function preload(){
    Img=loadImage("3.avif");
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(450,200);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Identifying object";
}

function modelLoaded(){
    console.log("Model loaded");
    status=true;
    objectDetector.detect(Img,gotPoses);
}

function gotPoses(error,results){
    if(error){
     console.error(error);
    }
    else{
     console.log(results);
     objects=results;
    }
 }
 
 
 function draw(){
     image(Img,0,0,400,400);
      
     if(status!=""){
         for(i=0;i<objects.length; i++){
             document.getElementById("status").innerHTML="Status: Object detected";
             
             fill("#FF0000");
             percent=floor(objects[i].confidence*100);
             text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
             noFill();
             stroke("#FF0000");
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
 
         }
     }
 }
