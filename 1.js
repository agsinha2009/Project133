status="";
Img="";
var objects=[];

function preload(){
    Img=loadImage("cell_phone.webp");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Identifying object";
}

function modelLoaded(){
    console.log("Model loaded");
    status=true;
    objectDetector.detect(Img,gotResults);
}

function gotResults(error,results){
    if(error){
     console.error(error);
    }
    else{
     console.log(results);
     objects=results;
    }
 }
 
 
 function draw(){
     image(Img,0,0,600,500);
      
     if(status!=""){
         for(i=0;i<objects.length; i++){
             document.getElementById("status").innerHTML="Status: Object detected";
             
             fill("#FF0000");
             percent=floor(objects[i].confidence*100);
             text(objects[i].label+" "+percent+"%",objects[i].x-270,objects[i].y-270);
             noFill();
             stroke("#FF0000");
             rect(objects[i].x-270,objects[i].y-270,objects[i].width,objects[i].height);
 
         }
     }
 }
